<form action="{{route('category_add')}}" method="POST" enctype="multipart/form-data">
    @csrf
    <h1 class="ml-5 mb-3">Category </h1>
    <div class="mb-5 px-5">
      <label class="form-label"><h5>Name</h5></label>
      <input type="text" name="name" class="form-control">
    </div>
    <div class="mb-5 px-5">
        <label class="form-label"><h5>Image</h5></label>
        <input type="file" name="image">
      </div>
    
    <button class="mt-3" type="submit" class="btn btn-primary ml-5 ">Thêm</button>
</form>
