var dbVacas = localStorage.getItem("dbVacas"); 
var operacion = "A"; 
dbVacas = JSON.parse(dbVacas);
if (dbVacas === null) 
    dbVacas = [];


function Mensaje(t){
        switch (t) {
            case 1: 
                $(".mensaje-alerta").append(
                    "<div class='alert alert-success' role='alert'>Se agrego con exito el caso</div>"
                );
                break;
            case 2: 
                $(".mensaje-alerta").append(
                    "<div class='alert alert-danger' role='alert'>Se elimino el caso </div>"
                );
                break;
            default:

        }
    }


function AgregarVaca () {
 
    var datos_cliente = JSON.stringify({
        Fecha: $("#fecha").val(),
        Nombre : $("#nombre").val(),
        Descripcion: $("#Descripcion").val(),
        Tipo: $("#Tipo").val(),
        link : $("#link").val(),
        lugar: $("#Lugar").val(),
        Latitud: $("#Latitud").val(),
        Longitud: $("#Longitud").val(),
        Muertos : $("#Muertos").val(),
        Heridos : $("#Heridos").val(),
    });

    dbVacas.push(datos_cliente); 
    localStorage.setItem("dbVacas", JSON.stringify(dbVacas));



    ListarVacas();


    return Mensaje(1);
}



function ListarVacas (){
    $("#dbVacas-list").html(
            "<thead>" +
                "<tr>" +
                    "<th> ID </th>" +

                    "<th> Titulo </th>" +
                    "<th> Descripcion </th>" +
                    "<th> Tipo </th>" +
                    "<th> URL </th>" +
                    "<th> Lugar </th>" +
                    "<th> Latitud </th>" +
                    "<th> Longitud </th>" +
                    "<th> Muertos </th>" +
                    "<th> Heridos </th>" +
                    "<th> fecha</th>" +
                    "<th> </th>" +
                    "<th>  </th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
    );

    for (var i in dbVacas) {
        var d = JSON.parse(dbVacas[i]);
        $("#dbVacas-list").append(
                        "<tr>" +
                            "<td>" + i + "</td>" +
                            "<td>" + d.Nombre + "</td>" +
                            "<td>" + d.Descripcion + "</td>" +
                            "<td>" + d.Tipo + "</td>" +
                            "<td>" + d.link + "</td>" +
                            "<td>" + d.lugar + "</td>" +
                            "<td>" + d.Latitud + "</td>" +
                            "<td>" + d.Longitud + "</td>" +
                            "<td>" + d.Muertos + "</td>" +
                            "<td>" + d.Heridos + "</td>" +
                            "<td>" + d.Fecha+ "</td>" +
                            "<td> <a id='"+ i +"' class='btnEditar' href='#'> <span class='glyphicon glyphicon-pencil'> </span>  </a> </td>" +
                            "<td> <a id='" + i + "' class='btnEliminar' href='#'> <span class='glyphicon glyphicon-trash'> </span> </a> </td>" +
                        "</tr>"
                           );
    }

}


if (dbVacas.length !== 0) {
    ListarVacas();
} else {
    $("#dbVacas-list").append("<h2> No tienes casos </h2>");
}

function contarVacas(){
    var vacas = dbVacas;
    nVacas = vacas.length;

    $("#numeroVacas").append(
        "<a>Tienes actualmente" + "<br>" + "<span class='badge'>" + nVacas + "</span></a> casos"
    );
    return nVacas;
}

function Eliminar(e){
    dbVacas.splice(e, 1); 
    localStorage.setItem("dbVacas", JSON.stringify(dbVacas));
    return Mensaje(2);
}

function Editar() {
    dbVacas[indice_selecionado] = JSON.stringify({
        Nombre : $("#nombre").val(),
        Descripcion: $("#Descripcion").val(),
        Tipo: $("#Tipo").val(),
        link : $("#link").val(),
        lugar: $("#Lugar").val(),
        Longitud: $("#Longitud").val(),
        Latitud: $("#Latitud").val(),
        Muertos : $("#Muertos").val(),
        Heridos: $("#Heridos").val(),
        Fecha: $("#fecha_nacimiento").val(),
    });
    localStorage.setItem("dbVacas", JSON.stringify(dbVacas));
    operacion = "A"; 
    return true;

}

function showGoogleMaps()
{

    var point = new google.maps.LatLng('41.397122', '2.152873');

    var myOptions = {
        zoom: 15, 
        center: point, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 

    var map = new google.maps.Map(document.getElementById("showMap"),  myOptions);
 

    var marker = new google.maps.Marker({
        position:point,
        map: map,
        title: "Nombre empresa - Calle Balmes 192, Barcelona"
    });
}
showGoogleMaps();

$(".btnEliminar").bind("click", function(){
    alert("¿ Me quieres eliminar ?");
    indice_selecionado = $(this).attr("id"); 
    console.log(indice_selecionado);
    console.log(this);
    Eliminar(indice_selecionado); 
    ListarVacas();
});

$(".btnEditar").bind("click", function() {
    alert("¿ Me quieres editar ?");

    $(".modo").html("<span class='glyphicon glyphicon-pencil'> </span> Modo edición");
    operacion = "E";
    indice_selecionado = $(this).attr("id");
    console.log(indice_selecionado);
    console.log(this);

    var vacaItem = JSON.parse(dbVacas[indice_selecionado]);
    $("#nombre").val(vacaItem.Nombre);
    $("#Descripcion").val(vacaItem.Descripcion);
    $("#Tipo").val(vacaItem.Tipo);
    $("#link").val(vacaItem.link);
    $("#Lugar").val(vacaItem.lugar);
    $("#Latitud").val(vacaItem.Latitud);
    $("#Longitud").val(vacaItem.Longitud);
    $("#Muertos").val(vacaItem.Muertos);
    $("#Heridos").val(vacaItem.Heridos);
    $("#fecha").val(vacaItem.Fecha);
    $("#nombre").focus();
});


contarVacas();

$("#vacas-form").bind("submit", function() {
    debugger;
    if (operacion == "A")
        return AgregarVaca();
    else {
        return Editar();
    }
});

const reports = JSON.parse(localStorage.getItem("reports-data"));
    const dataTypeCase = [0, 0, 0];
    reports.forEach((report) => {
        if (report.type.toLowerCase() === "robo") {
            dataTypeCase[0] += 1;
        }
        else if (report.type.toLowerCase() === "atraco") {
            dataTypeCase[1] += 1;
        }
        else {
            dataTypeCase[2] += 1;
        }
    });
    const data = {
        labels: [
            "Robo",
            "Atraco",
            "Homicidio"
        ],
        datasets: [{
                data: dataTypeCase,
                backgroundColor: [
                    "rgb(9, 132, 227)",
                    "rgb(253, 203, 110)",
                    "rgb(214, 48, 49)"
                ],
                hoverOffset: 4
            }]
    };
    const config = {
        type: "bar",
        data: data,
    };
    new Chart(ctxOne, config);