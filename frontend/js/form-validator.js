class FormValidator {
  constructor(form) {
    this.form = form;
  }

  validate() {
    let isValid = true;
    
    // Limpiar errores anteriores
    this.clearErrors();

    // Validar nombre
    const nombre = this.form.elements['nombre'];
    if (!nombre.value.trim()) {
      this.showError(nombre, 'El nombre es obligatorio');
      isValid = false;
    }

    // Validar email
    const email = this.form.elements['email'];
    if (!email.value.trim()) {
      this.showError(email, 'El email es obligatorio');
      isValid = false;
    } else if (!this.isValidEmail(email.value)) {
      this.showError(email, 'Email inválido');
      isValid = false;
    }

    // Validar fecha
    const fecha = this.form.elements['fechaNacimiento'];
    if (!fecha.value) {
      this.showError(fecha, 'La fecha es obligatoria');
      isValid = false;
    } else if (!this.isValidDate(fecha.value)) {
      this.showError(fecha, 'Debe ser una fecha pasada');
      isValid = false;
    }

    // Validar tipo de consulta
    const tipoConsulta = this.form.querySelector('input[name="tipoConsulta"]:checked');
    if (!tipoConsulta) {
      const radioGroup = this.form.querySelector('.radio-group');
      const errorSpan = radioGroup.parentElement.querySelector('.error-message');
      if (errorSpan) {
        errorSpan.textContent = 'Seleccione una opción';
        errorSpan.classList.add('show');
      }
      isValid = false;
    }

    // Validar mensaje
    const mensaje = this.form.elements['mensaje'];
    if (!mensaje.value.trim()) {
      this.showError(mensaje, 'El mensaje es obligatorio');
      isValid = false;
    } else if (mensaje.value.trim().length < 10) {
      this.showError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
      isValid = false;
    }

    console.log('Validación resultado:', isValid);
    return isValid;
  }

  showError(input, message) {
    if (input) {
      input.classList.add('error');
      const errorSpan = input.parentElement.querySelector('.error-message');
      if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
      }
    }
  }

  clearErrors() {
    const errorInputs = this.form.querySelectorAll('.error');
    const errorMessages = this.form.querySelectorAll('.error-message');

    errorInputs.forEach(input => input.classList.remove('error'));
    errorMessages.forEach(span => {
      span.textContent = '';
      span.classList.remove('show');
    });
  }

  isValidEmail(email) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  isValidDate(date) {
    const inputDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate < today;
  }
}