(function(window) {
    window.extractData = function() {

        function makeArray(x) {
            if (!Array.isArray(x)) {
              return [x];
            }
            return x;
          }

        function getPatientName(patient) {
            var name  = makeArray(patient.name);
            var fname = makeArray(name[0].given  || "").join(" ");
            var lname = makeArray(name[0].family || "").join(" ");
            return {
              given : fname,
              family: lname
            };
          }

        return FHIR.oauth2.ready().then(function(client){
            
            // Fetch the patient

            var patientQuery = client.patient.read();

            var labsQuery = (function() {
                var query = new URLSearchParams();
                query.set("patient", client.patient.id);
                query.set("code", 'http://loinc.org|8480-6');
                return client.request("Observation?" + query, { pageLimit: 0});
            })()

            return Promise.all([patientQuery, labsQuery]).then(function(data){

                console.log(data[0]);
                var patient = data[0];

                var name = getPatientName(patient);

                return name;

            })

        }); 

    };
})(window);

