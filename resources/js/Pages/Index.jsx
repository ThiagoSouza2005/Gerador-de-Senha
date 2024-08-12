import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';





export default function senha({senhasGravadas}){
const [cego, setCego ]= useState('password');
const [valorSenha, setValorSenha ]= useState();
const [itemSenhas, setItemSenhas] = useState(senhasGravadas);

useEffect(() => {
    console.log(itemSenhas)
}, [itemSenhas])

const handleSave = () => {
    if(valorSenha && valorSenha.trim() !=='') {
        setItemSenhas(e => [...e,valorSenha]);
        setValorSenha("");
    }
    else{
        console.log('a senha não foi gerada');
    }

    const salvar = async () => {
        console.log( 'senha que vai ser salva: ', valorSenha)
        const salvando = await fetch ('gravarSenha?senhaSalva='+valorSenha,{
            method:'get',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const senhaSalvada = await salvando.json()
        console.log('resposta do banco',senhaSalvada.senhaGavadas)
        // setValorSenha(senhaSalvada.senhaGravadas)

        setItemSenhas(senhaSalvada.senhaGavadas)
  
    }
    salvar()
}

function mostrarSenha(){

    if (cego == 'password'){
        setCego('text')
    }
    else {
        setCego('password')
    }
}

function gerarSenhar(e){
    e.preventDefault(); 
    console.log('funcionou');

    const aparecerSenha = async () => {
        const resposta = await fetch ('/senha',{
            method:'get',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const dadosGerados = await resposta.json()
        setValorSenha(dadosGerados.senha)
        console.log(dadosGerados.senha)
    }
    aparecerSenha()
}

    return <>
        <body className='bg-gray-800 min-h-screen pt-12 '>
            <div className='w-96 items-center mx-auto  '>
              
                <div className='flex'>
                    <div className='items-center mx-auto flex'>
                        <button type="button" class="p-6  ml-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={gerarSenhar}> GERAR SENHA</button>
                    </div>

                    <div className='items-center mx-auto flex'>
                        <button type="button" class="p-6  ml-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSave} > SALVAR</button>
                    </div>
                </div>

                <div className='p-4'>
                    <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SENHA GERADA</label>
                    
                    <div class="flex">
                        <button onClick={() => mostrarSenha()}>
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 h-12">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f3ecec" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg>
                            </span>
                        </button>

                        <input type={cego} id="website-admin" class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" tie placeholder="senha" readOnly value={valorSenha}/>
                    </div>

                </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-center">
                                    Senhas geradas
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemSenhas.map((item) => {
                                    return (
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">   
                                                {item}
                                            </th>
                                        </tr>
                                    )
                                })
                            }

                            
                        </tbody>
                    </table>
                </div>

            </div>
        </body>
    </>
}
