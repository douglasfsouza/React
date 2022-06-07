import './modal.css';
import {FiX} from 'react-icons/fi';
export default function Modal({conteudo,close}){
    return(
        <div className='modal' key="modal">
            <div className='container' key="modal2">
                <button className='close' key="btn1-modal" onClick={close} >
                    <FiX size={23} color='#FFF' key="icon-1-modal"/>
                    Voltar                   
                </button>

                <div key="div-detalhes-modal">
                    <h2 key="h2-detalhes-modal">
                        Detalhes do chamado
                    </h2>
                </div>

                <div className='row' key="div-cliente-modal">
                    <span key="span-cliente-modal">
                        Cliente: <a key="a-cliente-modal">{conteudo.cliente}</a>
                    </span>
                </div>

                <div className='row' key="div-assunto-modal">
                    <span key="span-assunto-modal">
                        Assunto: <a key="a-assunto-modal">{conteudo.assunto}</a>
                    </span>
                    <span key="span-abertura-modal">
                        Cadastrado em: <a key="a-abertura-moedal">{conteudo.abertura}</a>
                    </span>
                </div>

                <div className='row' key="div-status-modal">
                    <span key="span-status-modal">
                        
                         Status: <a style={{color:'#FFF', backgroundColor: conteudo.status == 'Aberto' ? '#5cb85c' : '#999'}} key="a-status-modal-1">{conteudo.status}</a> 
                    </span>
                </div>

                {conteudo.complemento !== '' &&(
                    <>
                        <h3 key="h3-complemento-modal">Complemento</h3>
                        <p key="p-complemento-modal">
                            {conteudo.complemento}
                        </p>
                    </>
                )}

            </div>
            
        </div>
    )
}