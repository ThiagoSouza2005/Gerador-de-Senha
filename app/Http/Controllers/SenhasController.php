<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SenhasController extends Controller
{
    //
    public function index(){
        return Inertia::render("Index");
    }

    public function gerarSenha(){
        $ma = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $mi = 'abcdefghijklmnopqrstuvwxyz';
        $nu = '0123456789';
        $si = '!@#$%"&*()';
        $senha ='fdavfdgafdhfgdhz';
        $tamanho=10;
        $maiuscula=true;
        $minuscula =true;
        $numeros=true;
         $simbolos=true;

        if ($maiuscula){
            $senha .= str_shuffle($ma);
        }

        if ($minuscula){
            $senha .= str_shuffle($mi);
        }

        if ($numeros){
            $senha .= str_shuffle($nu);
        }
        if ($simbolos){
            $senha .= str_shuffle($si);
        }
       return response()->json(['senha'=>substr(str_shuffle($senha),0,$tamanho)]);

}

}
