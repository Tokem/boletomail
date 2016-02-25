$(function() {

   
        $("#data_inicio").pickadate({
            formatSubmit: 'dd/mm/yyyy',
            selectYears: true,
            viewMode: "months", 
            minViewMode: "months",
            hiddenPrefix: true,
            hiddenName: true,
            hiddenId: false,
        });


        $("#data_fim").pickadate({
            formatSubmit: 'dd/mm/yyyy',
            selectYears: true,
            viewMode: "months", 
            minViewMode: "months",
            hiddenPrefix: true,
            hiddenName: true,
            hiddenId: false,
        });

        $("#mes_inicio").pickadate({
            selectMonths: true,
            selectYears: true,
            format: "mm-yyyy",
            viewMode: "months", 
            minViewMode: "months",
            // formatSubmit: 'mm/yyyy',
            hiddenPrefix: true,
            hiddenName: true,
            hiddenId: false,
        });

});