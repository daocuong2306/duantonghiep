@extends('template.product')
@section('content')



<div class="container">
    <table class="table">
        <tr class="primary">
            <td>ID</td>
            <td>Name</td>
            <td>Prices</td>
            <td>Description</td>
            <td>Status</td>
            <td>image</td>
            <td>code</td>
            <td>id_category</td>
            <td>Action</td>
        </tr>
        @foreach($products as $item)
        <tr>
            <td>{{$item->id}}</td>
            <td>{{$item->name}}</td>
            <td>{{$item->prices}}</td>
            <td>{{$item->description}}</td>  
            <td>{{$item->status}}</td> 
            <td><img src="{{ $item->image?''.Storage::url($item->image):''}}" style="width: 100px" /></td>
            <td>{{$item->code}}</td> 
            <td>{{$item->id_category}}</td> 
            {{-- <td>
                <option value="{{$item->id}}">{{$item->name}}</option>
            </td> --}}
            <th>
            <button  class="btn btn-primary"><a style="text-decoration: none; color: white;" href="{{route('product_edit',['id'=>$item->id])}}"> Edit </a></button>
          <button  class="btn btn-primary"><a style="text-decoration: none; color: white;" href="{{route('product_delete',['id'=>$item->id])}}">Delete</a></button>
            </th>
        </tr>
        @endforeach
    </table>
    <button  class="btn btn-primary ml-3 "><a style="text-decoration: none; color: white;" href="{{route('product_add')}}">Add</a></button>
</div>

@endsection