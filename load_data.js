(function(window) {
    window.extractData = function() {

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
                return data[0];

            })

        }); 

    };
})(window);

