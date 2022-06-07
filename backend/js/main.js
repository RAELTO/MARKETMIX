//LOGIC

//vue class object
//a public or global variable that will be accessible from index.html
var app = new Vue({
    el: '#app',
    data: {
        charges: [
            {
                id: 1, charge: 'admin', pin: '1234', b_salary: 1600000,
            }, // add name list or employees to list
            {id: 2, charge: 'secretary', pin: '5678', b_salary: 1580000},
            {id: 3, charge: 'seller', pin: '9012', b_salary: 1485000, comm1: 10, comm2: 20},
            {id: 4, charge: 'assembler', pin: '3456', b_salary: 1485000},
        ],
        operations: [
            {id: 1, type: '1', price: 85000, assembled: 50, sold: 40,},
            {id: 1, type: '2', price: 100000, assembled: 40, sold: 35,}
        ],
        adm_actions: [
            {ec1: '', ec2: '', ec3: '', reportActive: '', new_bsalary: '', pos: '', commission1: 10, commission2: 20}
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
        editcharge(index) {
            switch (index) {
                case 1:
                    this.adm_actions[0].ec1 = true;
                    this.adm_actions[0].new_bsalary = this.charges[1].b_salary;
                    this.adm_actions[0].pos = index;
                    break;
                case 2:
                    this.adm_actions[0].ec2 = true;
                    this.adm_actions[0].new_bsalary = this.charges[2].b_salary;
                    // this.charges[2].comm1 = this.adm_actions[0].commission1;
                    // this.charges[2].comm2 = this.adm_actions[0].commission2;
                    // console.log(this.charges[2].comm1);
                    // console.log(this.charges[2].comm2);
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
        save(){
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
        },
        xbtn(){
            this.adm_actions[0].ec1 = false;
            this.adm_actions[0].ec2 = false;
            this.adm_actions[0].ec3 = false;
            this.adm_actions[0].reportActive = false;
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
