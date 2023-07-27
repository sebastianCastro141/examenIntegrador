//// expresiones regulares para realizar las validaciones
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,// formato de mail con el arroba y dominio obligatorio
}
const campos = {
	nombreCompleto: false,
	mail: false,
	contrasenia: false,
}

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombreCompleto":
			validarCampo(expresiones.usuario, e.target, 'nombreCompleto');
		break;
		case "mail":
			validarCampo(expresiones.correo, e.target, 'mail');
		break;
		case "contrasenia":
			validarContrasenia();
			validarCampo(expresiones.password, e.target, 'contrasenia');
		break;
		case "contraseniaCo":
			validarContrasenia();
		break;



	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true
		
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false
	}
}

validarContrasenia = () => {
	const contrasenia = document.getElementById('contrasenia')
	const contraseniaCo = document.getElementById('contraseniaCo')

	if (contrasenia.value !== contraseniaCo.value ){
		document.getElementById(`grupo__contraseniaCo`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__contraseniaCo`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__contraseniaCo i`).classList.add('fa-circle-xmark');
		document.querySelector(`#grupo__contraseniaCo i`).classList.remove('fa-circle-check');
		document.querySelector(`#grupo__contraseniaCo .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[contrasenia] = false
	}
	else
	{
		document.getElementById(`grupo__contraseniaCo`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__contraseniaCo`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__contraseniaCo i`).classList.add('fa-circle-check');
		document.querySelector(`#grupo__contraseniaCo i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#grupo__contraseniaCo .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[contrasenia] = false
	}
	

}

inputs.forEach((input)=>{
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);

})

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	const terminos = document.getElementById('terminos')
	if (campos.nombreCompleto && campos.mail && campos.contrasenia && terminos.checked){
		
		formulario.reset();
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo')
		console.log(document.querySelectorAll('.formulario__grupo'))
		document.querySelectorAll('.formulario__grupo').forEach((icon)=>{
			icon.classList.remove('.formulario__grupo-correcto')
		})
		
		setTimeout (()=>{
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
		}, 5000)
		
		
	}
})

