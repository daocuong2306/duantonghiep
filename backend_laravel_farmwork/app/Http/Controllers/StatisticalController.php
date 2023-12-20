<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Cart;
use App\Models\Comment;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticalController extends Controller
{
    public function summary()
    {   // $month =  months in year 
        $month = \request()->month;
        //Query group by 'year', 'month', 'date' 
        $summary = Bill::where('order_status', 'Success')
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('YEAR(created_at) as year'),
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(total_price) as total_amount')
            )
            ->groupBy('year', 'month', 'date')
            ->get();

        $currentYear = date('Y');
        $currentMonthSum = date('m', strtotime("$currentYear-$month-01"));
        $daysInMonth = Carbon::create($currentYear, $currentMonthSum)->daysInMonth;
        // days in month
        $dailySummary = [];
        for ($day = 1; $day <= $daysInMonth; $day++) {
            $dailySummary[$day] = $summary->where('date', date('Y-m-d', strtotime("$currentYear-$currentMonthSum-$day")));
            // }
        }
        // daily total_amount in month
        $totalAmountPerDay = [];
        foreach ($dailySummary as $day => $summaryData) {
            $totalAmountPerDay[$day] = $summaryData->sum('total_amount');
        }

        $monthlySummary = $this->getMonthlySummary($summary);

        // Comment
        $comment = DB::table('comments')
            ->join('users', 'users.id', '=', 'comments.id_user')
            ->join('product', 'product.id', '=', 'comments.id_product')
            ->select('comments.*', 'product.name AS product_name', 'users.name AS user_name', 'users.image AS user_image')
            ->get();
        $handlecomment = $comment->groupBy('evaluate')->map(function ($group) {
            $totalStars = $group->sum('evaluate');
            $count = $group->count();

            return [
                'stars' => $group->first()->evaluate,
                'count' => $count,
            ];
        });

        // Lấy tháng hiện tại và tháng trước
        $currentMonth = date('m');
        $previousMonth = date('m', strtotime('-1 month'));

        // Truy vấn dữ liệu từ bảng bill
        $currentMonthTotal = Bill::where('order_status', 'Success')->whereMonth('created_at', $currentMonth)->sum('total_price');
        $previousMonthTotal = Bill::where('order_status', 'Success')->whereMonth('created_at', $previousMonth)->sum('total_price');

        // Tính toán sự tăng/giảm
        $increaseDecrease = $currentMonthTotal - $previousMonthTotal;

        // Kiểm tra xem có tăng hay giảm
        if ($increaseDecrease > 0) {
            $status = 'Tăng';
        } elseif ($increaseDecrease < 0) {
            $status = 'Giảm';
        } else {
            $status = 'Không thay đổi';
        }

        // Trả về kết quả
        $statusAmout = [
            'current_month_total' => $currentMonthTotal,
            'previous_month_total' => $previousMonthTotal,
            'increase_decrease' => $increaseDecrease,
            'status' => $status,
        ];
        $best_saler = Bill::where('order_status', 'Success')->select('carts_id')
            ->get();
        // dd($best_saler);
        $product = [];
        $quantityByProductId = [];
        $productInfo = [];
        $result = [];
        foreach ($best_saler as $key => $value) {
            $cart = json_decode($value->carts_id, true);
            foreach ($cart as $item) {
                $data = Cart::find($item);
                $product[$key][] = $data;
            }
        }
        foreach ($product as $row) {
            foreach ($row as $item) {
                if ($item !== null && isset($item['product_id'])) {
                    $productId = $item['product_id'];
                    $quantity = $item['quantity'];

                    if (!isset($quantityByProductId[$productId])) {
                        $quantityByProductId[$productId] = 0;
                    }

                    $quantityByProductId[$productId] += $quantity;
                    if (!isset($productInfo[$productId])) {
                        // dd($productId);
                        $productI = Product::find($productId);
                        $productInfo[$productId] = $productI;
                    }
                }
            }
        }
        foreach ($quantityByProductId as $productId => $quantity) {
            $result[] = [
                'product_id' => $productId,
                'quantity' => $quantity,
                'product_info' => $productInfo[$productId]
            ];
        }
        usort($result, function ($a, $b) {
            return $b['quantity'] - $a['quantity'];
        });

        $top5Products = array_slice($result, 0, 5);
        $statusTotal = [
            'Pending' => 0,
            'Success' => 0,
            'Browser' => 0,
            'Transport' => 0,
            'Pack' => 0,
            'Cancel' => 0,
        ];
        $bills = Bill::all();
        // dd($bills); 
        foreach ($bills as $value) {
            $status = $value->order_status;

            if (isset($statusTotal[$status])) {
                $statusTotal[$status]++;
            }
        }

        // dd($monthlySummary);
        return response()->json([
            "statusTotal"=>$statusTotal,
            'totalAmountPerDay' => $totalAmountPerDay,
            'total_price' => $monthlySummary,
            'product' => $top5Products,
            'comment' => $comment,
            'handlecomment' => $handlecomment,
            'statusAmout' => $statusAmout

        ]);
    }
    private function getMonthlySummary(Collection $summary)
    {
        $monthlySummary = [];

        // Generate a range of months from January to December
        $months = collect(range(1, 12))->map(function ($month) {
            return Carbon::create(null, $month, null)->format('F');
        });

        // Loop through each month and combine with the summary data
        $months->each(function ($month) use ($summary, &$monthlySummary) {
            $monthlySummary[$month] = $summary->firstWhere('month', Carbon::parse($month)->month);
        });

        return $monthlySummary;
    }
}
