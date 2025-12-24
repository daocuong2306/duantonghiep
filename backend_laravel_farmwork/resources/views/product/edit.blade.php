@extends('template.product')
@section('content')
<form action="{{route('product_edit',['id'=>$products->id])}}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="">
      <label class="form-label"><h5>Name</h5></label>
      <input type="text" name="name" value="{{$products->name}}" class="form-control">
    </div>
    <div class="">
        <label class="form-label"><h5>Prices</h5></label>
        <input type="text" name="prices" value="{{$products->prices}}" class="form-control">
      </div>
      <div class="">
        <label class="form-label"><h5>Description</h5></label>
        <input type="text" name="description" value="{{$products->description}}" class="form-control">
      </div>
      <div class="">
        <label class="form-label"><h5>Status</h5></label>
        <input type="text" name="status" value="{{$products->status}}" class="form-control">
      </div>
    <div class="">
        <label class="form-label"><h5>Image</h5></label>
        <img src="{{ $products->image?''.Storage::url($products->image):''}}" style="width: 100px" />
        <input type="file" name="image">

      </div>

      <div class="">
        <label class="form-label"><h5>Code_product</h5></label>
        <input type="text" name="code" value="{{$products->code}}" class="form-control">
      </div>
      <div class="mb-3">  
        <label class="form-label">Loại danh mục</label>
        <select name="id_category" id="">
            @foreach($category as $item)
                 @if($products->id_category == $item->id)
                        <option selected value="{{$item->id}}">{{$item->name}}</option>
               @else
               <option value="{{$item->id}}">{{$item->name}}</option>
               @endif
           
           @endforeach
           </select>
    </div>
      <button  class="btn btn-primary"  type="submit" >EDIT</button>
      <button  class="btn btn-primary"><a style="text-decoration: none; color: white;" href="{{route('product_index')}}">Product List</a></button>
</form>


@endsection