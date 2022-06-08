//LOGIC

//vue class object
//a public or global variable that will be accessible from index.html
var app = new Vue({
    el: '#app',
    data: {
        charges: [ //main charges and base salary
            {id: 1, charge: 'Admin', pin: '1234', b_salary: 1600000,}, // TODO add name list or employees to list
            {id: 2, charge: 'Secretary', pin: '5678', b_salary: 1200000, extrahw: 0, exh_v: 9000, total_pay: 0},
            {id: 3, charge: 'Seller', pin: '9012', b_salary: 1000000, comm1: 10, comm2: 20, subsT: 117200},
            {id: 4, charge: 'Assembler', pin: '3456', b_salary: 1485000, mshoes: 10, msneakers: 10, extrahw: 0},
        ],
        operations: [ //to be added into the secretary table
            {id: 1, type: '1', price: 85000, assembled: 50, sold: 40,},
            {id: 2, type: '2', price: 100000, assembled: 40, sold: 35,}
        ],
        adm_actions: [ // actions into the admin view
            {ec1: '', ec2: '', ec3: '', reportActive: '', new_bsalary: '', pos: '', commission1: 10, commission2: 20}
        ],
        charges_actions: [
            {mod_exhw1: '', mod_exhw2: ''}
        ],
        icharge: '', // login charge 
        test_admview: 1, //enable admin view if a condition is fulfilled
        ipin: '', //charge password
        c_login: 1, //enables or disable the view of the login modal or window 
        test_secretview: 0, //enables or disable the secretary view
        t_sold: 0, //to show values into the admin info table
        t_assm: 0,//to show values into the admin info table
        test_sellerview: '',//enables or disable the seller view
        test_assemblerview: '',//enables or disable the assembler view
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
                this.charges[2].comm1 = this.adm_actions[0].commission1;
                this.charges[2].comm2 = this.adm_actions[0].commission2;
                console.log(this.charges[2].comm1);
                console.log(this.charges[2].comm2);
            }
        },
        pReport(){
            this.adm_actions[0].reportActive = true;
            this.charges[1].exh_v = ((this.charges[1].b_salary/30)/8)*1.8;
            if(this.charges[1].extrahw > 0) {
                this.charges[1].total_pay = (this.charges[1].extrahw * this.charges[1].exh_v) + this.charges[1].b_salary;
            }else{
                this.charges[1].total_pay = this.charges[1].b_salary;
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
            this.test_seller_view = 0;
            this.test_assemblerview = 0;
            this.icharge = '';
            this.ipin = '';
            this.c_login = 1;
        },
        secretary_view(){
            this.test_secretview = 1;
            this.c_login = '';
            this.t_assm = this.operations[0].assembled + this.operations[1].assembled;
            this.t_sold = (this.operations[0].price * this.operations[0].sold)+(this.operations[1].price * this.operations[1].sold);
        },
        secSend(){
            this.charges[1].extrahw = this.charges_actions[0].mod_exhw1;
        },
        seller_view(){
            this.test_sellerview = 1;
            this.c_login = '';
        },
        assembler_view(){
            this.test_assemblerview = 1;
            this.c_login = '';
        }
    }
});
