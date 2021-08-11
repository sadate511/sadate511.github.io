let numCourant;

var menu = () => {
  var reponse = window.prompt(
    "---MENU SENMONEY---\n" +
      "---" +
      numCourant.numero +
      "---\n" +
      "1. Solde de mon compte\n" +
      "2. Transfert d Argent\n" +
      "3. Paiement de facture\n" +
      "4. options\n"
  );
  return reponse;
};
var menuOption = () => {
  var reponse = window.prompt(
    "---MENU SENMONEY---\n" +
      "---" +
      numCourant.numero +
      "---\n" +
      "1. Modifier votre code secret\n" +
      "2. Consulter les 5 dernières transactions\n"
  );
  return reponse;
};
var main = async () => {
  var select = $("#num");
  const res = await $.ajax({
    type: "GET",
    url: "oneAccountInfos.php",
    //obtenir la valeur sélectionnée dans une liste déroulante
    data: { id: select.children("option:selected").val() },
    dataType: "json",
  }).done(function (data) {
    console.log(`info`, data);
    numCourant = data[0];
  });
  var rep = menu();
  switch (rep) {
    case "1":
      afficheSolde();
      break;
    case "2":
      transfert();
      break;
    case "4":
      option();
      break;
  }
};
var quit = () => {
  alert("Au revoir");
};
var afficheSolde = async () => {
  var text = "";
  if (numCourant) {
    var codeClient = window.prompt(
      "Pour recevoir le solde de votre compte sen Money,\n" +
        "veuillez entrer votre code secret:\n" +
        "9.Accueil"
    );
    var codeServer = await $.ajax({
      type: "GET",
      //url: "oneAccountCode.php",
      url: "code.php",
      data: { id: numCourant.id },
      dataType: "json",
    });
    // console.log("code", codeServer)
    if (codeClient != "" && codeClient == codeServer[0].code) {
      var solde = await $.ajax({
        type: "GET",
        url: "solde.php",
        data: { id: numCourant.id },
        dataType: "json",
      });
      alert(
        "Le solde de votre comtpe Orange Money est de " +
          solde[0].solde +
          " FCFA"
      );
      etapeSuivant();
    } else {
      if (codeClient == 9) main();
      else alert("code erroné");
    }
  }
};
var transfert = async () => {
  if (numCourant) {
    var numero = window.prompt(
      "Je saisis le numéro de téléphone du \n" +
        "bénéficiaire qui doit recevoir l'argent:\n" +
        "0.Accueil"
    );
    if (numero == 0) {
      main();
    } else if (numero != -1) {
      var numNonExt = true;
      const res = await $.ajax({
        type: "GET",
        //url: "allAccount.php",
        url: "ges.php",
        dataType: "json",
      });
      console.log("2");
      for (const item in res) {
        if (numero == res[item].numero) {
          numNonExt = false;
          var montant = window.prompt(
            "Veuillez saisir le montant du transfert:"
          );
          var x = parseInt(montant);
          var code = window.prompt("Veuillez entrer votre code secret:");
          var codeServer = await $.ajax({
            type: "GET",
            //url: "oneAccountCode.php",
            url: "code.php",
            data: { id: numCourant.id },
            dataType: "json",
          });
          if (code == codeServer[0].code) {
            var solde = await $.ajax({
              type: "GET",
              //url: "oneAccountSolde.php",
              url: "solde.php",
              data: { id: numCourant.id },
              dataType: "json",
            });
            if (x <= parseInt(solde[0].solde)) {
              const ret = await $.ajax({
                type: "POST",
                url: "transfert.php",
                data: { from: numCourant.id, to: res[item].id, amount: x },
                dataType: "json",
              });
              console.log(`ret`, ret)
              alert(
                "Transfert effectué\nVous avez transferer " +
                  x +
                  " FCFA au " +
                  numero +
                  " votre nouveau solde est de " +
                  parseInt(parseInt(solde[0].solde) - x) +
                  " FCFA"
              );
              break;
            } else {
              alert("fond insuffisant");
              break;
            }
          } else {
            alert("code erroné");
            break;
          }
        }
      }
      if (numNonExt) {
        alert("Ce numéro n'existe pas");
      }
      etapeSuivant();
    }
  }
};
var option = async () => {
  const res = menuOption();
  if (res == "1") {
    if (numCourant) {
      var oldCode = window.prompt(
        "Vous allez changer cotre code secret \n" +
          "Entrez votre ancien code secret:\n" +
          "0.Accueil"
      );
      var codeServer = await $.ajax({
        type: "GET",
        //url: "oneAccountCode.php",
        url: "code.php",
        data: { id: numCourant.id },
        dataType: "json",
      });
      if (oldCode == codeServer[0].code) {
        var newCode = window.prompt("Entrez votre nouveau code code secret:");
        var result = await $.ajax({
          type: "POST",
          url: "changeCode.php",
          data: { id: numCourant.id, code: newCode },
          dataType: "json",
        });
        alert("Vous avez changer votre code avec succée !");
      } else alert("code erroné");
    }
  } else if (res == "2") {
    let listeTransacs = "";
    var oldCode = window.prompt(
        "Entrez votre code secret:\n"
    );
    var codeServer = await $.ajax({
      type: "GET",
      //url: "oneAccountCode.php",
      url: "code.php",
      data: { id: numCourant.id },
      dataType: "json",
    });
    if (oldCode == codeServer[0].code) {
      const allTrans = await $.ajax({
        type: "GET",
        url: "oneAccountTransactions.php",
        data: { id: numCourant.id },
        dataType: "json",
      });
      for (const transac in allTrans) {
        listeTransacs += allTrans[transac].source == numCourant.numero ?
          "Vous avez envoyé " +
          allTrans[transac].montant +
          "FCFA au " +
          allTrans[transac].destination +
          " le " +
          allTrans[transac].date +
          "\n" :
          "Vous avez reçu " +
          allTrans[transac].montant +
          "FCFA du " +
          allTrans[transac].source +
          " le " +
          allTrans[transac].date +
          "\n"
      }
      alert("Liste des transactions:\n" + "-----\n" + listeTransacs);
    }
  } else alert("code erroné");
  etapeSuivant();
};
var etapeSuivant = () => {
  confirm("Voulez vous retourner au menu principale") ? main() : quit();
};
