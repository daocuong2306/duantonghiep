@extends('template.category')
@section('content')
{{-- <form action="{{route('category_edit',['id'=>$categories->id])}}" method="POST" enctype="multipart/form-data">
    @csrf
     <h1 class="ml-5 mb-3">Edit Category </h1>
    <div class="mb-5 ml-5">
    <label class="form-label"><h5>Name</h5></label>
      <input type="text" name="name" value="{{$categories->name}}"  class="form-control ">
    </div>
    <label class="form-label"><h5>Image</h5></label>
        <img src="{{ $categories->image?''.Storage::url($categories->image):''}}" alt="" width="100px">
        <input type="file" name="image" id="">
    </div>
    <button type="submit" class="btn btn-primary ml-5">Submit</button>
</form> --}}
<h1>hihihi</h1>
@endsection