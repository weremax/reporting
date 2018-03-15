var fs = require('fs');
var jsreport = require('jsreport-core')();
jsreport.use(require('jsreport-phantom-pdf')());
jsreport.use(require('jsreport-handlebars')());
//jsreport.use(require('jsreport-jsrender')());

var looper = {
    data: [
        { inpatient: "Conversion Factor", codes: '', rate: '$22' },
        { inpatient: "Low / Short Stay", codes: 'DRG Value', rate: '$2' },
        { inpatient: "Low / Short Stay", codes: 'DRG Value', rate: '100.0000%' },
        { inpatient: "High Charge", codes: 'N/A', rate: '$2' },
        { inpatient: "High Charge %", codes: '', rate: '100.0000%' },
        { inpatient: "High Stay", codes: 'DRG Value', rate: '100.0000%' },
        { inpatient: "Death and Transfer %", codes: '', rate: '100.000%' },
        { inpatient: "Part Hosp", codes: '', rate: '$3' }
    ]
};

var templateData = `
<style>
.rTable {
    font-family: 'Helvetica';
    font-size: 12px;
    display: table;
    width: 70%;
    margin: 0 auto;
    margin-top: 15px;
}
.rTableRow {
    display: table-row;
}
.rTableHead {
    display: table-cell;
    padding: 3px 10px;
    border: 1px solid #999999;
    font-weight: bold;
    background-color: #ccc;
    font-size: 14px;
}
.rTableCell {
    display: table-cell;
    padding: 3px 10px;
    border: 1px solid #999999;
}
</style>
<h1>HEADER INFORMATION</h1>

<div class="rTable">
    <div class="rTableRow">
        <div class="rTableHead">INPATIENT</div>
        <div class="rTableHead">CODES</div>
        <div class="rTableHead">RATE</div>
    </div>

    
    {{#each data}}
        <div class="rTableRow">
            <div class="rTableCell">{{this.inpatient}}</div>
            <div class="rTableCell">{{this.codes}}</div>
            <div class="rTableCell">{{this.rate}}</div>
        </div>
    {{/each}}
    

</div>
`;

jsreport.init().then(() => {
    return jsreport.render({
        template: {
            recipe: 'phantom-pdf',
            engine: 'handlebars', //'jsrender',
            content: templateData
        },
        data: looper
    }).then((report) => {
        report.stream.pipe(fs.createWriteStream('test_PDF.pdf'));
    });
}).catch((e) => {
    console.log(e);
}) 