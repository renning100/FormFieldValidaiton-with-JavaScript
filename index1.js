var app = new Vue( {
    el: "#app",
    data: {
        "PropertyName":"",
        "AllowRegistrationButtons":true,
        "EmployeePin":"",
        "EmployeeName": "",
        "ActiveView": "",
        "Profile": {
            "First": "",
            "Last": "",
            "DoB": "",
            "Address": "",
            "Sex": "",
            "City": "",
            "State": "",
            "Zip": "",
            "Email": "",
            "Phone": "",
            "Pin": "",
            "RawScanData": ""
        },
        "isValidSex" : true,
        "isValidDoB" : true,
        "isValidRawScanData" : true,
        "isValidEmail" : true,
        "isValidFirst" : true,
        "isValidLast" : true,
        "isValidAddress" : true,
        "isValidCity" : true,
        "isValidState" : true,
        "isValidZip" : true,
        "isValidPhone" : true,
        "isValidPin" : true,
        "Reprint": {
            "AccountId":"",
            "First": "",
            "Last": ""
        },
        "ReprintRecommendations": [],
        "LoadedLogs": []
    },
    created: function() {
        var me = this;
    },
    methods: {
        LogIn: function(pin) {
      if (pin) {
        document.getElementById('pin').classList.remove('pinvalid');
        document.getElementById('field').style.display = 'none';
        var me = this;
        fetch('https://partners.safegold.com/v1/validate-pincode/' + pin, [])
          .then((response) => response.json())
          .then(function (data) {
            if (data) {
              me.EmployeeName = data;
              me.ActiveView = 'RegistrationView';
            } else {
              me.EmployeePin = '';
            }
          });
      } else {
        console.log('Invalid');
        document.getElementById('pin').classList.add('pinvalid');
        document.getElementById('field').style.display = 'block';
      }
        },
        LogOut: function() {
            var me = this;
            me.EmployeeName = "";
            me.EmployeePin = "";
            me.ActiveView = "";
            me.ResetForm();
        },
        LoadLogs: function() {
            var main = this;
            toastr.info("Loading logs");
            fetch("/getLogs", [])
            .then(response => response.json())
            .then(function(data){
                if (data){
                    main.LoadedLogs = data;
                }
            });
        },
        CopyLogId: function(log) {
            var emailEndpoint = "https://prod-72.westus.logic.azure.com:443/workflows/5d5b16fbc49b4a329259db810651c1a6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9gdnN38f_4xNWWx-afkbjw-dWmhAtWQGr9yYYYVZiOk";
            fetch(emailEndpoint, {method:"POST", body: JSON.stringify(log)})
            .then(response => response.json())
            .then(function(data){
                toastr.success(" Reported successfully", "Reported!");
            });
        },
        ResetForm: function() {
            var me = this;
            me.Profile = {
                "First": "",
                "Last": "",
                "DoB": "",
                "Address": "",
                "Sex": "",
                "City": "",
                "State": "",
                "Zip": "",
                "Email": "",
                "Phone": "",
                "Pin": "",
                "RawScanData": ""
            }
            me.ReprintRecommendations = [];
            me.LoadedLogs = [];
            document.getElementById("fnt").focus();
        },
        RegisterPlayer: function() {
            var me = this;
            me.AllowRegistrationButtons = false;
            me.Profile.Employee = me.EmployeePin;
            me.Profile.firstName = me.Profile.firstName;

            let isValidEmail = me.Profile.Email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            let isValidFirst = me.Profile.First.match(
                /^[a-zA-Z]/
            );
            let isValidLast = me.Profile.Last.match(
                /^[a-zA-Z]/
            );
            let isValidAddress = me.Profile.Address.match(
                /^[a-zA-Z]/
            );
            let isValidDoB = me.Profile.DoB.length !== 0;
            let isValidSex = me.Profile.Sex.match(
                /^[a-zA-Z]/
            )
            let isValidCity = me.Profile.City.match(
                /[\w ]/
            )
            let isValidState = me.Profile.State.match(
                /[\w ]/
            )
            let isValidZip = me.Profile.Zip.match(
                /\d{5}/
            )
            let isValidRawScanData = me.Profile.RawScanData.match(
                /^[a-zA-Z]/
            )
            let isValidPhone = me.Profile.Phone.match(
                /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
            );
            let isValidPin = me.Profile.Pin.match(
                /^[0-9]{1,6}$/
            );
            if(!isValidEmail){
                toastr.error("Not correct email.Try again");
                me.isValidEmail = false;
            } else {
                me.isValidEmail = true;
            }
            if(!isValidFirst){
                toastr.error("Not correct First Name. Try again");
                me.isValidFirst = false;
            } else {
                me.isValidFirst = true;
            }
            if(!isValidLast){
                toastr.error("Not correct Last Name. Try again");
                me.isValidLast = false;
            } else {
                me.isValidLast = true;
            }
            if(!isValidAddress) {
                toastr.error("Not correct Address. Try again");
                me.isValidAddress = false;
            } else {
                me.isValidAddress = true;
            }
            if(!isValidSex) {
                toastr.error("Not correct Sex. Try again");
                me.isValidSex = false;
            } else {
                me.isValidSex = true;
            }
            if(!isValidDoB) {
                toastr.error("Not correct Date. Try again");
                me.isValidDoB = false;
            } else {
                me.isValidDoB = true;
            }
            if(!isValidCity) {
                toastr.error("Not correct City.");
                me.isValidCity = false;
            } else {
                me.isValidCity = true;
            }
            if(!isValidState) {
                toastr.error("Not correct State.");
                me.isValidState = false;
            } else {
                me.isValidState = true;
            }
            if(!isValidZip) {
                toastr.error("Not correct Zip.");
                me.isValidZip = false;
            } else {
                me.isValidZip = true;
            }
            if(!isValidPhone) {
                toastr.error("Not correct Phone");
                me.isValidPhone = false;
            } else {
                me.isValidPhone = true;
            }
            if(!isValidPin) {
                toastr.error("Not correct Pin.");
                me.isValidPin = false;
            } else {
                me.isValidPin = true;
            }
            if(!isValidRawScanData) {
                toastr.error("Not correct RawScanData.");
                me.isValidRawScanData = false;
            } else {
                me.isValidRawScanData = true;
            }
            if(isValidEmail&&isValidFirst&&isValidAddress&&isValidPhone&&isValidRawScanData&&isValidPin&&isValidSex&&isValidLast&&isValidZip&&isValidCity&&isValidCity&&isValidState)
          {

            console.log("ok");            
            fetch("/register", {method:"POST", body: JSON.stringify(me.Profile), headers: {'Content-Type': 'application/json'}})
            .then(response => response.json())
            .then(function(data){
                if (data){
                    if (data["Profile"]["Id"]) {
                        toastr.success(" Created " + data["Profile"]["Id"], "Success");
                        me.Profile["Id"] = data["Profile"]["Id"];
                        me.PrintCard();
                        me.AllowRegistrationButtons = true;
                    }
                    else {
                        toastr.error(" Couldn't create account", "Error")
                    }
                }
            }).catch(function(error){
                toastr.error(" Please check required fields", "Error")
                me.AllowRegistrationButtons = true;
            });  
        }
        else {
                        console.log("false");    
                        me.AllowRegistrationButtons = true;        

        }
        },
        PrintCard: function() {
            var me = this;
            me.Profile.Employee = me.EmployeePin;
            fetch("/print", {method:"POST", body: JSON.stringify(me.Profile), headers: {'Content-Type': 'application/json'}})
            .then(response => response.json())
            .then(function(data){
                if (data) {
                    if (data) {
                        toastr.success(" Print job sent ", "Success")
                    }
                    else {
                        toastr.error(" Couldn't print card", "Error")
                    }
                    me.ResetForm();
                }
            }).catch(function(error){
                toastr.error(" Couldn't print card", "Error")
                me.ResetForm();
            });
        },
        FetchReprintRecommendations: function() {
            var me = this;
            // me.Profile.Employee = me.EmployeePin;
            let validationVals;
            validationVals.email = me.Profile.email;
            fetch("/potentialreprints", {method:"POST", body: JSON.stringify(me.Profile), headers: {'Content-Type': 'application/json'}})
            .then(response => response.json())
            .then(function(data){
                me.ReprintRecommendations = data;
                data.forEach(element => {

                     console.log(element.MemberAccountId);
                    fetch("/getRank/" + element.MemberAccountId)
                    .then(response => response.json())
                    .then(function(datax){
                        console.log(datax);
                        element["Rank"] = datax;
                    });
                });
                if (me.ReprintRecommendations.length > 0) {
                    toastr.info(" Looks like this account might exist", "Attention!");
                }
            });
        },
        APUpdate: function() {
            var me = this;
            toastr.info(" Loading active players", "Loading");
            fetch("/apUpdate").then(response => response.json())
            .then(function(data){
                if (data == 1){
                    toastr.success(" Active player db updated", "Success")
                }
                else {
                    toastr.error(" Couldn't update active players", "Error")
                }
            }).catch(function(error){
                toastr.error(" Couldn't update active players", "Error")
            });
        },
        ReprintCard: function(account) {
            var me = this;
            account.Employee = me.EmployeePin;
            fetch("/reprint", {method:"POST", body: JSON.stringify(account), headers: {'Content-Type': 'application/json'}})
            .then(response => response.json())
            .then(function(data){
                if (data){
                    if (data) {
                        toastr.success(" Print job sent ", "Success")
                    }
                    else {
                        toastr.error(" Couldn't print card", "Error")
                    }
                }
            }).catch(function(error){
                toastr.error(" Couldn't print card", "Error")
            });
        },
        EmailValidationFun :function(email){
            
        }
    }
});
