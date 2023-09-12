@extends('template.category')
@section('content')
<div class="container">
    <table class="table">
        <tr class="primary">
            <td>ID</td>
            <td>Name</td>
            <td>Image</td>
            <td>Action</td>
        </tr>
        @foreach($categories as $st)
        <tr>
            <td>{{$st->id}}</td>
            <td>{{$st->name}}</td>
            <td><img src="{{ $st->image?''.Storage::url($st->image):''}}" style="width: 100px" /></td>
            <th>
            <button  class="btn btn-primary"><a style="text-decoration: none; color: white;" href="{{route('category_edit',['id'=>$st->id])}}">Edit</a></button>
            <button  class="btn btn-primary"><a style="text-decoration: none; color: white;" href="{{route('category_delete',['id'=>$st->id])}}">Delete</a></button>
            </th>
        </tr>
        @endforeach
    </table>
    <button  class="btn btn-primary ml-3 "><a style="text-decoration: none; color: white;" href="/add">Add</a></button>
</div>
@endsection