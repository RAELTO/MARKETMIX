//LOGIC

//vue class object
//a public or global variable that will be accessible from index.html
var app = new Vue({
    el: '#app',
    data: {
        charges: [ //main charges and base salary
            {id: 1, name: 'Zero', charge: 'Admin', pin: '1234', b_salary: 1600000,}, // TODO add name list or employees to list
            {id: 2, name: 'Elisa Dweebs', charge: 'Secretary', pin: '5678', b_salary: 1200000, extrahw: 0, exh_v: 9000, total_pay: 0},
            {id: 3, name: 'Carlo Fontana', charge: 'Seller', pin: '9012', b_salary: 1000000, comm1: 0.1, comm2: 0.2, subsT: 117200, tsold: 0, total_pay: 0},
            {
                id: 4, name: 'Alberto Arconti', charge: 'Assembler', pin: '3456', 
                b_salary: 1485000, tshoes: 0, tsneakers: 0, tassembled: 0, mshoes: 0, 
                msneakers: 0, exh_v: 0, extrahw: 0, subsT: 117200, childrens: 0, total_pay: 0
            },
        ],
        operations: [ //to be added into the secretary table
            {id: 1, type: 1, price: 85000, assembled: 0, amount: 0, sold: 0},
            {id: 2, type: 2, price: 100000, assembled: 0, amount: 0, sold: 0}
        ],
        adm_actions: [ // actions into the admin view
            {ec1: '', ec2: '', ec3: '', reportActive: '', 
            new_bsalary: 0, pos: '', commission1: 10, commission2: 20, 
            costshoes: 200, costsneakers: 350, mshoes: 2500, msneakers: 3500}
        ],
        charges_actions: [
            {mod_exhw1: 0, mod_exhw2: 0, tcommission: 0, childrens: 0,}
        ],
        icharge: '', // login charge 
        test_admview: 0, //enable admin view if a condition is fulfilled
        ipin: '', //charge password
        c_login: 1, //enables or disable the view of the login modal or window 
        test_secretview: 0, //enables or disable the secretary view
        t_sold: 0, //to show values into the admin info table
        test_sellerview: 0,//enables or disable the seller view
        test_assemblerview: 0,//enables or disable the assembler view
    },
    methods: {
        select_view(){ //executes ever view when a condition is fulfilled
            if(this.icharge === 1 && this.ipin === this.charges[0].pin) {
                this.adm_view();
            }else if(this.icharge === 2 && this.ipin === this.charges[1].pin){
                this.secretary_view();
            }else if(this.icharge === 3 && this.ipin === this.charges[2].pin){
                this.seller_view();
            }else if(this.icharge === 4 && this.ipin === this.charges[3].pin){
                this.assembler_view();
            }else{
                alert('Incorrect PIN or charge doesnt match with pin');
            }
        },
        adm_view(){//enable the admin view
            this.test_admview = 1;
            this.c_login = '';
        },
        editcharge(index) {//edits the charges basic values
            switch (index) {
                case 1:
                    this.adm_actions[0].ec1 = true;
                    this.adm_actions[0].new_bsalary = this.charges[1].b_salary;
                    this.adm_actions[0].pos = index;
                    break;
                case 2:
                    this.adm_actions[0].ec2 = true;
                    this.adm_actions[0].new_bsalary = this.charges[2].b_salary;
                    this.adm_actions[0].pos = index;
                    break;
                case 3:
                    this.adm_actions[0].ec3 = true;
                    this.adm_actions[0].new_bsalary = this.charges[3].b_salary;
                    this.adm_actions[0].pos = index;
                    break;
                default:
                    break;
            }
        },
        save(){//save the modified info when the save button is clicked or the key enter is pressed
            this.charges[this.adm_actions[0].pos].b_salary = this.adm_actions[0].new_bsalary;
            if(this.adm_actions[0].pos === 2){
                this.charges[2].comm1 = this.adm_actions[0].commission1/100;
                this.charges[2].comm2 = this.adm_actions[0].commission2/100;
            }
            alert(`Salary updated for the employee: ${this.charges[this.adm_actions[0].pos].name} with Charge: ${this.charges[this.adm_actions[0].pos].charge}`)
        },
        pReport(){
            this.adm_actions[0].reportActive = true;

            //Secretary settlement operations
            this.charges[1].exh_v = ((this.charges[1].b_salary/30)/8)*1.8;
            if(this.charges[1].extrahw > 0) {
                this.charges[1].total_pay = (this.charges[1].extrahw * this.charges[1].exh_v) + this.charges[1].b_salary;
            }else{
                this.charges[1].total_pay = this.charges[1].b_salary;
            }

            //seller settlement operations
            if(this.charges[2].tsold > 5000000 && this.charges[2].tsold < 10000000) {
                this.charges_actions[0].tcommission = this.charges[2].b_salary * this.charges[2].comm1;
                this.charges[2].total_pay = this.charges_actions[0].tcommission + this.charges[2].b_salary + this.charges[2].subsT;
            }else if(this.charges[2].tsold > 10000000) {
                this.charges_actions[0].tcommission = this.charges[2].b_salary * this.charges[2].comm2;
                this.charges[2].total_pay = this.charges_actions[0].tcommission + this.charges[2].b_salary + this.charges[2].subsT;
            }else {
                this.charges_actions[0].tcommission = 0;
                this.charges[2].total_pay = this.charges[2].b_salary + this.charges[2].subsT;
            }

            //assembler settlement operations
            this.charges[3].exh_v = ((this.charges[3].b_salary/30)/8)*2.2;
            if(this.charges[3].extrahw > 0) {
                this.charges[3].total_pay = (this.charges[3].extrahw * this.charges[3].exh_v) + this.charges[3].b_salary + this.charges[3].subsT;
            }else{
                this.charges[3].total_pay = this.charges[3].b_salary + this.charges[3].subsT;
            }

            if(this.charges[3].tshoes > 1000 && this.charges[3].tshoes < 2000){
                const increase = (this.adm_actions[0].costshoes*this.charges[3].tshoes)*0.1;
                this.charges[3].total_pay += increase;
            }else if(this.charges[3].tshoes > 1000){
                const increase = (this.adm_actions[0].costshoes*this.charges[3].tshoes)*0.2;
                this.charges[3].total_pay += increase;
            }

            if(this.charges[3].tsneakers > 1700 && this.charges[3].tsneakers < 3000){
                const increase = (this.adm_actions[0].costsneakers*this.charges[3].tsneakers)*0.15;
                this.charges[3].total_pay += increase;
            }else if(this.charges[3].tsneakers > 3000){
                const increase = (this.adm_actions[0].costsneakers*this.charges[3].tsneakers)*0.3;
                this.charges[3].total_pay += increase;
            }

            if(this.charges[3].childrens > 0 && this.charges[3].childrens < 2){
                const bonus= 80000;
                this.charges[3].total_pay += bonus;
            }else if(this.charges[3].childrens >= 2){
                const bonus= 60000 * this.charges[3].childrens;
                this.charges[3].total_pay += bonus;
            }

        },
        xbtn(){
            this.adm_actions[0].ec1 = false;
            this.adm_actions[0].ec2 = false;
            this.adm_actions[0].ec3 = false;
            this.adm_actions[0].reportActive = false;
        },
        logout(){
            this.test_admview = 0;
            this.test_secretview= 0;
            this.test_sellerview = 0;
            this.test_assemblerview = 0;
            this.icharge = '';
            this.ipin = '';
            this.c_login = 1;
        },
        secretary_view(){
            this.test_secretview = 1;
            this.c_login = '';
            this.charges[3].tassembled = this.operations[0].assembled + this.operations[1].assembled;
            this.t_sold = (this.operations[0].price * this.operations[0].sold)+(this.operations[1].price * this.operations[1].sold);
        },
        secSend(){
            this.charges[1].extrahw = this.charges_actions[0].mod_exhw1;
            alert("The data has been send");
        },
        seller_view(){
            this.test_sellerview = 1;
            this.c_login = '';
        },
        sellerSend(){
            if (this.operations[0].amount > 0 || this.operations[1].amount > 0 ) {
                this.charges[2].tsold = (this.operations[0].amount*this.operations[0].price)+(this.operations[1].amount*this.operations[1].price);
            }else{
                alert("Please type an amount or press the logout button to return to the login page");
            }
            alert("The data has been send");
        },
        assembler_view(){
            this.test_assemblerview = 1;
            this.c_login = '';
        },
        assembSend(){
            if (this.operations[0].assembled > this.adm_actions[0].mshoes || this.operations[1].assembled > this.adm_actions[0].msneakers) {
                alert('You have exceeded the max amount of shoes or sneakers allowed to be assembled')
                this.test_assemblerview = 0;
                this.icharge = '';
                this.ipin = '';
                this.c_login = 1;
            }else{
                this.charges[3].extrahw = this.charges_actions[0].mod_exhw2;
                this.charges[3].tshoes = this.operations[0].assembled;
                this.charges[3].tsneakers = this.operations[1].assembled;
                alert("The data has been send");
            }
        }
    }
});
