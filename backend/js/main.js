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
        icharge: '',
        test_admview: '',
        test_admpass: '',
        c_login: 1,
        adm_logout: 0
    },
    methods: {
        adm_view(){
            if(this.icharge === 1 && this.test_admpass === this.charges[0].pin) {
                this.test_admview = 1;
                this.c_login = '';
            }else{
                alert('Incorrect PIN');
            }
        }
    }
});
