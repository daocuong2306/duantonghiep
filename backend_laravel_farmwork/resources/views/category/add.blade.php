@extends('template.category')
@section('content')
<form action="{{route('category_add')}}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="">
      <label class="form-label"><h5>Name</h5></label>
      <input type="text" name="name" class="form-control">
    </div>
    <div class="">
        <label class="form-label"><h5>Image</h5></label>
        <input type="file" name="image">
      </div>
    
      <button  class="btn btn-primary"><a style="text-decoration: none; color: white;" href="">Add</a></button>
      <button  class="btn btn-primary"><a style="text-decoration: none; color: white;" href="/category">Category List</a></button>
</form>
@endsection