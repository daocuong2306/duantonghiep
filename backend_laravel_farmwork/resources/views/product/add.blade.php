@extends('template.product')
@section('content')
<form action="{{route('product_add')}}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="">
      <label class="form-label"><h5>Name</h5></label>
      <input type="text" name="name" class="form-control">
    </div>
    <div class="">
        <label class="form-label"><h5>Prices</h5></label>
        <input type="text" name="prices" class="form-control">
      </div>
      <div class="">
        <label class="form-label"><h5>Description</h5></label>
        <input type="text" name="description" class="form-control">
      </div>
      <div class="">
        <label class="form-label"><h5>Status</h5></label>
        <input type="text" name="status" class="form-control">
      </div>
    <div class="">
        <label class="form-label"><h5>Image</h5></label>
        <input type="file" name="image">
      </div>

      <div class="">
        <label class="form-label"><h5>Code_product</h5></label>
        <input type="text" name="code" class="form-control">
      </div>
      <div class="mb-3">  
        <label class="form-label">Loại khóa học</label>
        <select name="id_category" id="">
             @foreach($category as $loai)
                <option value="{{$loai->id}}">{{$loai->name}}</option>
             @endforeach 
        </select>
    </div>
      <button  class="btn btn-primary"  type="submit" >ADD</button>
      <button  class="btn btn-primary"><a style="text-decoration: none; color: white;" href="{{route('product_index')}}">Product List</a></button>
</form>


@endsection