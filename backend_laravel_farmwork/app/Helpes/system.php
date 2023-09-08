<?php
function uploadFile($nameFolder,$file){
    $fileName = time() .'_'.$file->getClientOriginalName();
    return $file->storeAS($nameFolder,$fileName,'public');
}