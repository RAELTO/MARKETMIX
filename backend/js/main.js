//LOGIC

//vue class object
//a public or global variable that will be accessible from index.html
var app = new Vue({
    el: '#app',
    data: {
        charges: [
            {id: 1, charge: 'admin', pin: '1234', b_salary: 1600000},
            {id: 2, charge: 'secretary', pin: '5678', b_salary: 1580000},
            {id: 3, charge: 'seller', pin: '9012', b_salary: 1485000},
            {id: 4, charge: 'assembler', pin: '3456', b_salary: 1485000},
        ],
        operations: [
            {id: 1, type: '1', price: 85000, assembled: 50, sold: 40,},
            {id: 1, type: '2', price: 100000, assembled: 40, sold: 35,}
        ],
        icharge: '',
        test_admview: '',
        ipin: '',
        c_login: 1,
        adm_logout: 0,
        test_secretview: '',
        t_sold: 0,
        t_assm: 0,
        test_sellerview: '',
        test_assemblerview: '',
    },
    methods: {
        select_view(){
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
        adm_view(){
            this.test_admview = 1;
            this.c_login = '';
        },
        secretary_view(){
                this.test_secretview = 1;
                this.c_login = '';
                this.t_assm = this.operations[0].assembled + this.operations[1].assembled;
                this.t_sold = (this.operations[0].price * this.operations[0].sold)+(this.operations[1].price * this.operations[1].sold);
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
