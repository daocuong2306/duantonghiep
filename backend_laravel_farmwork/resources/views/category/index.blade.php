<div class="container">
    <table class="table">
        <tr class="primary">
            <td>ID</td>
            <td>Loại Phòng</td>
            <td>Image</td>
            <td>Thao tác</td>
        </tr>
        @foreach($categories as $st)
        <tr>
            <td>{{$st->id}}</td>
            <td>{{$st->name}}</td>
            <td><img src="{{ $st->image?''.Storage::url($st->image):''}}" style="width: 100px" /></td>
            <th>
            <button  class="btn btn-primary"><a style="text-decoration: none; color: white;" href="{{route('category_edit',['id'=>$st->id])}}">Sửa</a></button>
            <button  class="btn btn-primary"><a style="text-decoration: none; color: white;" href="{{route('category_delete',['id'=>$st->id])}}">Xóa</a></button>
            </th>
        </tr>
        @endforeach
    </table>
    <button  class="btn btn-primary ml-3 "><a style="text-decoration: none; color: white;" href="/add">Thêm</a></button>
</div>