async function getLineKPI() {

    const response = await fetch('http://rtmbiw.br.scania.com/EbbaNet/api/APIKpi/')
    const data = await response.json()
    const myJson = JSON.parse(await data)
    return myJson

}

function getBufferById(array, id) {
    for (const buffer of array) {
        if (buffer.ID == id) {
            return buffer
        }
    }
}

async function LineFunction() {


    const json = await getLineKPI()
        //Main Control

    var auxiliar
    id = 101684325
    const PlanMC = getBufferById(json, id)
    document.getElementById("PlanMC").innerHTML = PlanMC.Value_.toFixed(0);



    id = 100004399
    const ProdMC = getBufferById(json, id)
    document.getElementById("ProdMC").innerHTML = ProdMC.Value_.toFixed(0);


    id = 100004395
    const SaldoMC = getBufferById(json, id)
    document.getElementById("SaldoMC").innerHTML = SaldoMC.Value_.toFixed(0);

    if (SaldoMC.Indicator == 1) {
        document.getElementById("SaldoMC").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowMC").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowMC").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoMC.Indicator == 2) {
            document.getElementById("SaldoMC").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowMC").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowMC").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoMC").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowMC").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowMC").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684310
    const PerdaMC = getBufferById(json, id)
    document.getElementById("PerdaMC").innerHTML = PerdaMC.Value_.toFixed(0);

    if (PerdaMC.Indicator == 1) {
        document.getElementById("PerdaMC").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaMC.Indicator == 2) {
            document.getElementById("PerdaMC").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaMC").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004391
    const BufferMC = getBufferById(json, id)
    document.getElementById("BufferMC").innerHTML = BufferMC.Value_.toFixed(0);

    if (BufferMC.Indicator == 1) {
        document.getElementById("BufferMC").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferMC.Indicator == 2) {
            document.getElementById("BufferMC").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferMC").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdMC.Value_ / PlanMC.Value_)).toFixed(1);
    document.getElementById("BarMC").style.width = auxiliar + "%";
    document.getElementById("BarMC").innerHTML = auxiliar + "%";




    //Main Variant
    id = 101684327
    const PlanMV = getBufferById(json, id)
    document.getElementById("PlanMV").innerHTML = PlanMV.Value_.toFixed(0);

    id = 100004401
    const ProdMV = getBufferById(json, id)
    document.getElementById("ProdMV").innerHTML = ProdMV.Value_.toFixed(0);

    id = 100004397
    const SaldoMV = getBufferById(json, id)
    document.getElementById("SaldoMV").innerHTML = SaldoMV.Value_.toFixed(0);

    if (SaldoMV.Indicator == 1) {
        document.getElementById("SaldoMV").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowMV").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowMV").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoMV.Indicator == 2) {
            document.getElementById("SaldoMV").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowMV").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowMV").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoMV").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowMV").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowMV").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684312
    const PerdaMV = getBufferById(json, id)
    document.getElementById("PerdaMV").innerHTML = PerdaMV.Value_.toFixed(0);

    if (PerdaMV.Indicator == 1) {
        document.getElementById("PerdaMV").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaMV.Indicator == 2) {
            document.getElementById("PerdaMV").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaMV").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004393
    const BufferMV = getBufferById(json, id)
    document.getElementById("BufferMV").innerHTML = BufferMV.Value_.toFixed(0);

    if (BufferMV.Indicator == 1) {
        document.getElementById("BufferMV").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferMV.Indicator == 2) {
            document.getElementById("BufferMV").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferMV").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdMV.Value_ / PlanMV.Value_)).toFixed(1);
    document.getElementById("BarMV").style.width = auxiliar + "%";
    document.getElementById("BarMV").innerHTML = auxiliar + "%";

    //Main Frame 
    id = 101684326
    const PlanMF = getBufferById(json, id)
    document.getElementById("PlanMF").innerHTML = PlanMF.Value_.toFixed(0);

    id = 100004400
    const ProdMF = getBufferById(json, id)
    document.getElementById("ProdMF").innerHTML = ProdMF.Value_.toFixed(0);

    id = 100004396
    const SaldoMF = getBufferById(json, id)
    document.getElementById("SaldoMF").innerHTML = SaldoMF.Value_.toFixed(0);

    if (SaldoMF.Indicator == 1) {
        document.getElementById("SaldoMF").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowMF").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowMF").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoMF.Indicator == 2) {
            document.getElementById("SaldoMF").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowMF").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowMF").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoMF").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowMF").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowMF").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684311
    const PerdaMF = getBufferById(json, id)
    document.getElementById("PerdaMF").innerHTML = PerdaMF.Value_.toFixed(0);

    if (PerdaMF.Indicator == 1) {
        document.getElementById("PerdaMF").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaMF.Indicator == 2) {
            document.getElementById("PerdaMF").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaMF").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004392
    const BufferMF = getBufferById(json, id)
    document.getElementById("BufferMF").innerHTML = BufferMF.Value_.toFixed(0);

    if (BufferMF.Indicator == 1) {
        document.getElementById("BufferMF").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferMF.Indicator == 2) {
            document.getElementById("BufferMF").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferMF").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdMF.Value_ / PlanMF.Value_)).toFixed(1);
    document.getElementById("BarMF").style.width = auxiliar + "%";
    document.getElementById("BarMF").innerHTML = auxiliar + "%";

    //Door Left
    id = 101684318
    const PlanDL = getBufferById(json, id)
    document.getElementById("PlanDL").innerHTML = PlanDL.Value_.toFixed(0);

    id = 100003099
    const ProdDL = getBufferById(json, id)
    document.getElementById("ProdDL").innerHTML = ProdDL.Value_.toFixed(0);

    id = 100004352
    const SaldoDL = getBufferById(json, id)
    document.getElementById("SaldoDL").innerHTML = SaldoDL.Value_.toFixed(0);

    if (SaldoDL.Indicator == 1) {
        document.getElementById("SaldoDL").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowDL").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowDL").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoDL.Indicator == 2) {
            document.getElementById("SaldoDL").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowDL").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowDL").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoDL").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowDL").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowDL").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684303
    const PerdaDL = getBufferById(json, id)
    document.getElementById("PerdaDL").innerHTML = PerdaDL.Value_.toFixed(0);

    if (PerdaDL.Indicator == 1) {
        document.getElementById("PerdaDL").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaDL.Indicator == 2) {
            document.getElementById("PerdaDL").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaDL").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004362
    const BufferDL = getBufferById(json, id)
    document.getElementById("BufferDL").innerHTML = BufferDL.Value_.toFixed(0);

    if (BufferDL.Indicator == 1) {
        document.getElementById("BufferDL").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferDL.Indicator == 2) {
            document.getElementById("BufferDL").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferDL").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdDL.Value_ / PlanDL.Value_)).toFixed(1);
    document.getElementById("BarDL").style.width = auxiliar + "%";
    document.getElementById("BarDL").innerHTML = auxiliar + "%";

    //Door Right
    id = 101684319
    const PlanDR = getBufferById(json, id)
    document.getElementById("PlanDR").innerHTML = PlanDR.Value_.toFixed(0);

    id = 100004388
    const ProdDR = getBufferById(json, id)
    document.getElementById("ProdDR").innerHTML = ProdDR.Value_.toFixed(0);

    id = 100004387
    const SaldoDR = getBufferById(json, id)
    document.getElementById("SaldoDR").innerHTML = SaldoDR.Value_.toFixed(0);

    if (SaldoDR.Indicator == 1) {
        document.getElementById("SaldoDR").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowDR").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowDR").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoDR.Indicator == 2) {
            document.getElementById("SaldoDR").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowDR").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowDR").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoDR").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowDR").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowDR").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684304
    const PerdaDR = getBufferById(json, id)
    document.getElementById("PerdaDR").innerHTML = PerdaDR.Value_.toFixed(0);

    if (PerdaDR.Indicator == 1) {
        document.getElementById("PerdaDR").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaDR.Indicator == 2) {
            document.getElementById("PerdaDR").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaDR").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004386
    const BufferDR = getBufferById(json, id)
    document.getElementById("BufferDR").innerHTML = BufferDR.Value_.toFixed(0);

    if (BufferDR.Indicator == 1) {
        document.getElementById("BufferDR").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferDR.Indicator == 2) {
            document.getElementById("BufferDR").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferDR").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdDR.Value_ / PlanDR.Value_)).toFixed(1);
    document.getElementById("BarDR").style.width = auxiliar + "%";
    document.getElementById("BarDR").innerHTML = auxiliar + "%";



    //Rear Wall
    id = 101684329
    const PlanRW = getBufferById(json, id)
    document.getElementById("PlanRW").innerHTML = PlanRW.Value_.toFixed(0);

    id = 100003106
    const ProdRW = getBufferById(json, id)
    document.getElementById("ProdRW").innerHTML = ProdRW.Value_.toFixed(0);

    id = 100004359
    const SaldoRW = getBufferById(json, id)
    document.getElementById("SaldoRW").innerHTML = SaldoRW.Value_.toFixed(0);

    if (SaldoRW.Indicator == 1) {
        document.getElementById("SaldoRW").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowRW").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowRW").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoRW.Indicator == 2) {
            document.getElementById("SaldoRW").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowRW").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowRW").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoRW").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowRW").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowRW").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684314
    const PerdaRW = getBufferById(json, id)
    document.getElementById("PerdaRW").innerHTML = PerdaRW.Value_.toFixed(0);

    if (PerdaRW.Indicator == 1) {
        document.getElementById("PerdaRW").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaRW.Indicator == 2) {
            document.getElementById("PerdaRW").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaRW").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004369
    const BufferRW = getBufferById(json, id)
    document.getElementById("BufferRW").innerHTML = BufferRW.Value_.toFixed(0);

    if (BufferRW.Indicator == 1) {
        document.getElementById("BufferRW").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferRW.Indicator == 2) {
            document.getElementById("BufferRW").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferRW").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdRW.Value_ / PlanRW.Value_)).toFixed(1);
    document.getElementById("BarRW").style.width = auxiliar + "%";
    document.getElementById("BarRW").innerHTML = auxiliar + "%";


    //Roof  
    id = 101684328
    const PlanRO = getBufferById(json, id)
    document.getElementById("PlanRO").innerHTML = PlanRO.Value_.toFixed(0);

    id = 100003105
    const ProdRO = getBufferById(json, id)
    document.getElementById("ProdRO").innerHTML = ProdRO.Value_.toFixed(0);

    id = 100004358
    const SaldoRO = getBufferById(json, id)
    document.getElementById("SaldoRO").innerHTML = SaldoRO.Value_.toFixed(0);

    if (SaldoRO.Indicator == 1) {
        document.getElementById("SaldoRO").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowRO").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowRO").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoRW.Indicator == 2) {
            document.getElementById("SaldoRO").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowRO").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowRO").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoRO").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowRO").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowRO").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684313
    const PerdaRO = getBufferById(json, id)
    document.getElementById("PerdaRO").innerHTML = PerdaRO.Value_.toFixed(0);

    if (PerdaRO.Indicator == 1) {
        document.getElementById("PerdaRO").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaRO.Indicator == 2) {
            document.getElementById("PerdaRO").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaRO").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004368
    const BufferRO = getBufferById(json, id)
    document.getElementById("BufferRO").innerHTML = BufferRO.Value_.toFixed(0);

    if (BufferRO.Indicator == 1) {
        document.getElementById("BufferRO").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferRO.Indicator == 2) {
            document.getElementById("BufferRO").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferRO").style.color = 'rgb(214, 0, 28)'
        }
    }
    auxiliar = (100 * (ProdRO.Value_ / PlanRO.Value_)).toFixed(1);
    document.getElementById("BarRO").style.width = auxiliar + "%";
    document.getElementById("BarRO").innerHTML = auxiliar + "%";

    //Side Left
    id = 101684330
    const PlanSL = getBufferById(json, id)
    document.getElementById("PlanSL").innerHTML = PlanSL.Value_.toFixed(0);

    id = 100003107
    const ProdSL = getBufferById(json, id)
    document.getElementById("ProdSL").innerHTML = ProdSL.Value_.toFixed(0);

    id = 100004360
    const SaldoSL = getBufferById(json, id)
    document.getElementById("SaldoSL").innerHTML = SaldoSL.Value_.toFixed(0);
    if (SaldoSL.Indicator == 1) {
        document.getElementById("SaldoSL").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowSL").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowSL").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoSL.Indicator == 2) {
            document.getElementById("SaldoSL").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowSL").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowSL").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoSL").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowSL").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowSL").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684315
    const PerdaSL = getBufferById(json, id)
    document.getElementById("PerdaSL").innerHTML = PerdaSL.Value_.toFixed(0);

    if (PerdaSL.Indicator == 1) {
        document.getElementById("PerdaSL").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaSL.Indicator == 2) {
            document.getElementById("PerdaSL").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaSL").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004370
    const BufferSL = getBufferById(json, id)
    document.getElementById("BufferSL").innerHTML = BufferSL.Value_.toFixed(0);

    if (BufferSL.Indicator == 1) {
        document.getElementById("BufferSL").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferSL.Indicator == 2) {
            document.getElementById("BufferSL").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferSL").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdSL.Value_ / PlanSL.Value_)).toFixed(1);
    document.getElementById("BarSL").style.width = auxiliar + "%";
    document.getElementById("BarSL").innerHTML = auxiliar + "%";

    //Side Right
    id = 101684331
    const PlanSR = getBufferById(json, id)
    document.getElementById("PlanSR").innerHTML = PlanSR.Value_.toFixed(0);

    id = 100003108
    const ProdSR = getBufferById(json, id)
    document.getElementById("ProdSR").innerHTML = ProdSR.Value_.toFixed(0);

    id = 100004361
    const SaldoSR = getBufferById(json, id)
    document.getElementById("SaldoSR").innerHTML = SaldoSR.Value_.toFixed(0);

    if (SaldoSR.Indicator == 1) {
        document.getElementById("SaldoSR").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowSR").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowSR").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoSR.Indicator == 2) {
            document.getElementById("SaldoSR").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowSR").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowSR").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoSR").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowSR").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowSR").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684316
    const PerdaSR = getBufferById(json, id)
    document.getElementById("PerdaSR").innerHTML = PerdaSR.Value_.toFixed(0);

    if (PerdaSR.Indicator == 1) {
        document.getElementById("PerdaSR").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaSR.Indicator == 2) {
            document.getElementById("PerdaSR").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaSR").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004371
    const BufferSR = getBufferById(json, id)
    document.getElementById("BufferSR").innerHTML = BufferSR.Value_.toFixed(0);

    if (BufferSR.Indicator == 1) {
        document.getElementById("BufferSR").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferSR.Indicator == 2) {
            document.getElementById("BufferSR").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferSR").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdSR.Value_ / PlanSR.Value_)).toFixed(1);
    document.getElementById("BarSR").style.width = auxiliar + "%";
    document.getElementById("BarSR").innerHTML = auxiliar + "%";


    //Floor Complete
    id = 101684320
    const PlanFC = getBufferById(json, id)
    document.getElementById("PlanFC").innerHTML = PlanFC.Value_.toFixed(0);

    id = 100003100
    const ProdFC = getBufferById(json, id)
    document.getElementById("ProdFC").innerHTML = ProdFC.Value_.toFixed(0);

    id = 100004353
    const SaldoFC = getBufferById(json, id)
    document.getElementById("SaldoFC").innerHTML = SaldoFC.Value_.toFixed(0);

    if (SaldoFC.Indicator == 1) {
        document.getElementById("SaldoFC").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowFC").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowFC").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoFC.Indicator == 2) {
            document.getElementById("SaldoFC").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowFC").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowFC").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoFC").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowFC").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowFC").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684305
    const PerdaFC = getBufferById(json, id)
    document.getElementById("PerdaFC").innerHTML = PerdaFC.Value_.toFixed(0);

    if (PerdaFC.Indicator == 1) {
        document.getElementById("PerdaFC").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaFC.Indicator == 2) {
            document.getElementById("PerdaFC").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaFC").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004363
    const BufferFC = getBufferById(json, id)
    document.getElementById("BufferFC").innerHTML = BufferFC.Value_.toFixed(0);

    if (BufferFC.Indicator == 1) {
        document.getElementById("BufferFC").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferFC.Indicator == 2) {
            document.getElementById("BufferFC").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferFC").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdFC.Value_ / PlanFC.Value_)).toFixed(1);

    document.getElementById("BarFC").style.width = auxiliar + "%";
    document.getElementById("BarFC").innerHTML = auxiliar + "%";

    //Floor Middle
    id = 101684322
    const PlanFM = getBufferById(json, id)
    document.getElementById("PlanFM").innerHTML = PlanFM.Value_.toFixed(0);

    id = 100003102
    const ProdFM = getBufferById(json, id)
    document.getElementById("ProdFM").innerHTML = ProdFM.Value_.toFixed(0);

    id = 100004355
    const SaldoFM = getBufferById(json, id)
    document.getElementById("SaldoFM").innerHTML = SaldoFM.Value_.toFixed(0);

    if (SaldoFM.Indicator == 1) {
        document.getElementById("SaldoFM").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowFM").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowFM").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoFM.Indicator == 2) {
            document.getElementById("SaldoFM").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowFM").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowFM").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoFM").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowFM").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowFM").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684307
    const PerdaFM = getBufferById(json, id)
    document.getElementById("PerdaFM").innerHTML = PerdaFM.Value_.toFixed(0);

    if (PerdaFM.Indicator == 1) {
        document.getElementById("PerdaFM").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaFM.Indicator == 2) {
            document.getElementById("PerdaFM").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaFM").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004365
    const BufferFM = getBufferById(json, id)
    document.getElementById("BufferFM").innerHTML = BufferFM.Value_.toFixed(0);

    if (BufferFM.Indicator == 1) {
        document.getElementById("BufferFM").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferFM.Indicator == 2) {
            document.getElementById("BufferFM").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferFM").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdFM.Value_ / PlanFM.Value_)).toFixed(1);

    document.getElementById("BarFM").style.width = auxiliar + "%";
    document.getElementById("BarFM").innerHTML = auxiliar + "%";

    //Floor Left
    id = 101684321
    const PlanFL = getBufferById(json, id)
    document.getElementById("PlanFL").innerHTML = PlanFL.Value_.toFixed(0);

    id = 100003101
    const ProdFL = getBufferById(json, id)
    document.getElementById("ProdFL").innerHTML = ProdFL.Value_.toFixed(0);

    id = 100004354
    const SaldoFL = getBufferById(json, id)
    document.getElementById("SaldoFL").innerHTML = SaldoFL.Value_.toFixed(0);


    if (SaldoFL.Indicator == 1) {
        document.getElementById("SaldoFL").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowFL").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowFL").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoFL.Indicator == 2) {
            document.getElementById("SaldoFL").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowFL").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowFL").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoFL").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowFL").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowFL").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684306
    const PerdaFL = getBufferById(json, id)
    document.getElementById("PerdaFL").innerHTML = PerdaFL.Value_.toFixed(0);

    if (PerdaFL.Indicator == 1) {
        document.getElementById("PerdaFL").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaFL.Indicator == 2) {
            document.getElementById("PerdaFL").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaFL").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004364
    const BufferFL = getBufferById(json, id)
    document.getElementById("BufferFL").innerHTML = BufferFL.Value_.toFixed(0);

    if (BufferFL.Indicator == 1) {
        document.getElementById("BufferFL").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferFL.Indicator == 2) {
            document.getElementById("BufferFL").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferFL").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdFL.Value_ / PlanFL.Value_)).toFixed(1);
    document.getElementById("BarFL").style.width = auxiliar + "%";
    document.getElementById("BarFL").innerHTML = auxiliar + "%";


    //Floor Right
    id = 101684323
    const PlanFR = getBufferById(json, id)
    document.getElementById("PlanFR").innerHTML = PlanFL.Value_.toFixed(0);

    id = 100003103
    const ProdFR = getBufferById(json, id)
    document.getElementById("ProdFR").innerHTML = ProdFR.Value_.toFixed(0);

    id = 100004356
    const SaldoFR = getBufferById(json, id)
    document.getElementById("SaldoFR").innerHTML = SaldoFR.Value_.toFixed(0);


    if (SaldoFR.Indicator == 1) {
        document.getElementById("SaldoFR").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowFR").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowFR").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoFR.Indicator == 2) {
            document.getElementById("SaldoFR").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowFR").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowFR").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoFR").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowFR").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowFR").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684308
    const PerdaFR = getBufferById(json, id)
    document.getElementById("PerdaFR").innerHTML = PerdaFR.Value_.toFixed(0);


    if (PerdaFR.Indicator == 1) {
        document.getElementById("PerdaFR").style.color = 'rgb(96, 178, 105)'

    } else {
        if (PerdaFR.Indicator == 2) {
            document.getElementById("PerdaFR").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaFR").style.color = 'rgb(214, 0, 28)'
        }
    }

    id = 100004366
    const BufferFR = getBufferById(json, id)
    document.getElementById("BufferFR").innerHTML = BufferFR.Value_.toFixed(0);

    if (BufferFR.Indicator == 1) {
        document.getElementById("BufferFR").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferFR.Indicator == 2) {
            document.getElementById("BufferFR").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferFR").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdFR.Value_ / PlanFR.Value_)).toFixed(1);
    document.getElementById("BarFR").style.width = auxiliar + "%";
    document.getElementById("BarFR").innerHTML = auxiliar + "%";

    //Front Wall   
    id = 101684324
    const PlanFT = getBufferById(json, id)
    document.getElementById("PlanFT").innerHTML = PlanFT.Value_.toFixed(0);

    id = 100003104
    const ProdFT = getBufferById(json, id)
    document.getElementById("ProdFT").innerHTML = ProdFT.Value_.toFixed(0);

    id = 100004357
    const SaldoFT = getBufferById(json, id)
    document.getElementById("SaldoFT").innerHTML = SaldoFT.Value_.toFixed(0);


    if (SaldoFT.Indicator == 1) {
        document.getElementById("SaldoFT").style.color = 'rgb(96, 178, 105)'

        document.getElementById("ArrowFT").style.color = 'rgb(96, 178, 105)'
        document.getElementById("ArrowFT").style.transform = 'rotate(-135deg)'
    } else {
        if (SaldoFT.Indicator == 2) {
            document.getElementById("SaldoFT").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowFT").style.color = 'rgb(225, 169, 62)'
            document.getElementById("ArrowFT").style.transform = 'rotate(135deg)'
        } else {
            document.getElementById("SaldoFT").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowFT").style.color = 'rgb(214, 0, 28)'
            document.getElementById("ArrowFT").style.transform = 'rotate(45deg)'
        }
    }

    id = 101684309
    const PerdaFT = getBufferById(json, id)
    document.getElementById("PerdaFT").innerHTML = PerdaFT.Value_.toFixed(0);


    if (PerdaFT.Indicator == 1) {
        document.getElementById("PerdaFT").style.color = 'rgb(96, 178, 105)'
    } else {
        if (PerdaFT.Indicator == 2) {
            document.getElementById("PerdaFT").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("PerdaFT").style.color = 'rgb(214, 0, 28)'
        }
    }


    id = 100004367
    const BufferFT = getBufferById(json, id)
    document.getElementById("BufferFT").innerHTML = BufferFT.Value_.toFixed(0);

    if (BufferFT.Indicator == 1) {
        document.getElementById("BufferFT").style.color = 'rgb(96, 178, 105)'
    } else {
        if (BufferFT.Indicator == 2) {
            document.getElementById("BufferFT").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("BufferFT").style.color = 'rgb(214, 0, 28)'
        }
    }

    auxiliar = (100 * (ProdFT.Value_ / PlanFT.Value_)).toFixed(1);
    document.getElementById("BarFT").style.width = auxiliar + "%";
    document.getElementById("BarFT").innerHTML = auxiliar + "%";



    //DIA

    id = 101702427
    const buffer1 = getBufferById(json, id)
    document.getElementById("KPIPlanDia").innerHTML = buffer1.Value_;



    id = 101702432
    const buffer2 = getBufferById(json, id)
    document.getElementById("KPIRealDia").innerHTML = buffer2.Value_;




    id = 100004201
    const buffer3 = getBufferById(json, id)
    document.getElementById("KPISaldoDia").innerHTML = buffer3.Value_.toFixed(0);
    document.getElementById("ProgressGraphicDia").style.strokeDashoffset = 440 * (buffer2.Value_ / buffer1.Value_);
    document.getElementById("KPISaldoDiaGraphic").innerHTML = (100 * (buffer2.Value_ / buffer1.Value_)).toFixed(1) + "%";




    if (buffer3.Indicator == 1) {
        document.getElementById("KPISaldoDia").style.color = 'rgb(96, 178, 105)'
    } else {
        if (buffer3.Indicator == 2) {
            document.getElementById("KPISaldoDia").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("KPISaldoDia").style.color = 'rgb(214, 0, 28)'
        }
    }



    //TURNO

    id = 101684327
    const buffer4 = getBufferById(json, id)
    document.getElementById("KPIPlanTurno").innerHTML = buffer4.Value_;


    id = 100004401
    const buffer5 = getBufferById(json, id)
    document.getElementById("KPIRealTurno").innerHTML = buffer5.Value_;


    id = 101702433
    const buffer6 = getBufferById(json, id)
    document.getElementById("KPISaldoTurno").innerHTML = buffer6.Value_.toFixed(0);
    document.getElementById("KPISaldoTurnoGraphic").innerHTML = buffer6.Value_;
    document.getElementById("ProgressGraphicSaldo").style.strokeDashoffset = 440 * (buffer5.Value_ / buffer4.Value_);
    document.getElementById("KPISaldoTurnoGraphic").innerHTML = (100 * (buffer5.Value_ / buffer4.Value_)).toFixed(1) + "%";



    if (buffer6.Indicator == 1) {
        document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
    } else {
        if (buffer6.Indicator == 2) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
        } else {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
        }
    }



    //OPE & Buffer MV-MC

    id = 100004393
    const buffer7 = getBufferById(json, id)
    document.getElementById("BufferMV-MC").innerHTML = buffer7.Value_.toFixed(0);


    id = 101706472
    const buffer8 = getBufferById(json, id)
    document.getElementById("OPE-Turno").innerHTML = buffer8.Value_.toFixed(0) + "%";
    document.getElementById("OPETurnoGraphic").innerHTML = buffer8.Value_.toFixed(0) + "%";
    document.getElementById("ProgressGraphicOPETurno").style.strokeDashoffset = (440 * buffer8.Value_) / 100;


    id = 101706471
    const buffer9 = getBufferById(json, id)
    document.getElementById("OPE-Dia").innerHTML = buffer9.Value_.toFixed(0) + "%";
    document.getElementById("OPEDiaGraphic").innerHTML = buffer9.Value_.toFixed(0) + "%";
    document.getElementById("ProgressGraphicOPEDia").style.strokeDashoffset = (440 * buffer9.Value_) / 100;


    console.log(json)
}
LineFunction()