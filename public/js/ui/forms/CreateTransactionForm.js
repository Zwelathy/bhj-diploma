/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
 /**
  * Вызывает родительский конструктор и
  * метод renderAccountsList
  * */
 constructor(element) {
   super(element)
   this.renderAccountsList();
   this.element = element;
 }  

 /**
  * Получает список счетов с помощью Account.list
  * Обновляет в форме всплывающего окна выпадающий список
  * */
 renderAccountsList() {
   const modaAccList = this.element.querySelector('select.accounts-select');
   modaAccList.innerHTML = '';
   const data = User.current();  
   Account.list(data, (error, response) => { 
     if (response.success) {
       response.data.forEach(key => modaAccList.insertAdjacentHTML('beforeend', 
       `<option value="${key.id}">${key.name}</option>`))
     }
   });
 }

 /**
  * Создаёт новую транзакцию (доход или расход)
  * с помощью Transaction.create. По успешному результату
  * вызывает App.update(), сбрасывает форму и закрывает окно,
  * в котором находится форма
  * */
 onSubmit(data) {
   Transaction.create(data, (error, response) => {
     if (response.success) {
       let modalMenuName;

       switch (data.type) {
         case 'expense':
          modalMenuName = 'newExpense';
         break;

         case 'income':
          modalMenuName = 'newIncome';
         break;
       }

       document.forms[`new-${data.type}-form`].reset();
       App.getModal(modalMenuName).close();
       App.update();
     }
   });
 }
}