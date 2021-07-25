//Chamada API - dados para cards
async function getLineKPI() {

    const response = await fetch('http://rtmbiw.br.scania.com/EbbaNet/api/APIKpi/')
    const data = await response.json()
    const myJson = JSON.parse(await data)
    return myJson

}

//Pesquisa do KPI
function getBufferById(array, id) {
    for (const buffer of array) {
        if (buffer.ID == id) {
            return buffer
        }
    }
}

//Função para filtrar cards de KPI's de acordo com item selecionado no dropdown de processo
async function LineFunction(line) {

    const json = await getLineKPI()
    
    if (line == "main_control") {
        //Main Control
        id = 101684325
        const PlanMC = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanMC.Value_.toFixed(0);

        id = 100004399
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004395
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);

        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004391
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "main_variant") {
        //Main Variant
        id = 101684327
        const PlanMV = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanMV.Value_.toFixed(0);

        id = 100004401
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004397
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);

        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004393
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "main_frame") {
        //Main Frame 
        id = 101684326
        const PlanMF = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanMF.Value_.toFixed(0);

        id = 100004400
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004396
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);

        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }
        id = 100004392
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "door_left") {
        //Door Left
        id = 101684318
        const PlanDL = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanDL.Value_.toFixed(0);

        id = 100003099
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004352
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);

        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004362
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "door_right") {
        //Door Right
        id = 101684319
        const PlanDR = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanDR.Value_.toFixed(0);

        id = 100004388
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004387
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);

        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004386
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "rear_wall") {
        //Rear Wall
        id = 101684329
        const PlanRW = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanRW.Value_.toFixed(0);

        id = 100003106
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004359
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);

        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004369
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "roof") {
        //Roof  
        id = 101684328
        const PlanRO = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanRO.Value_.toFixed(0);

        id = 100003105
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004358
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);

        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004368
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "side_left") {
        //Side Left
        id = 101684330
        const PlanSL = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanSL.Value_.toFixed(0);

        id = 100003107
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004360
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);
        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004370
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "side_right") {
        //Side Right
        id = 101684331
        const PlanSR = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanSR.Value_.toFixed(0);

        id = 100003108
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004361
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);

        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004371
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "floor_complete") {
        //Floor Complete
        id = 101684320
        const PlanFC = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanFC.Value_.toFixed(0);

        id = 100003100
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004353
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);

        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004363
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "floor_middle") {
        //Floor Middle
        id = 101684322
        const PlanFM = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanFM.Value_.toFixed(0);

        id = 100003102
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004355
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);

        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004365
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "floor_left") {
        //Floor Left
        id = 101684321
        const PlanFL = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanFL.Value_.toFixed(0);

        id = 100003101
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004354
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);


        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004364
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }

    else if (line == "floor_right") {
        //Floor Right
        id = 101684323
        const PlanFR = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanFR.Value_.toFixed(0);

        id = 100003103
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004356
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);


        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004366
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }
    
    else if (line == 'front_wall'){
        //Front Wall
        id = 100003104
        const KPIProduced = getBufferById(json, id)
        document.getElementById("KPIProduced").innerHTML = KPIProduced.Value_.toFixed(0);

        id = 100004357
        const KPISaldoTurno = getBufferById(json, id)
        document.getElementById("KPISaldoTurno").innerHTML = KPISaldoTurno.Value_.toFixed(0);

        id = 101684324
        const PlanFT = getBufferById(json, id)
        document.getElementById("KPIPlanDia").innerHTML = PlanFT.Value_.toFixed(0);


        if (KPISaldoTurno.Indicator == 1) {
            document.getElementById("KPISaldoTurno").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPISaldoTurno.Indicator == 2) {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPISaldoTurno").style.color = 'rgb(214, 0, 28)'
            }
        }

        id = 100004367
        const KPIBuffer = getBufferById(json, id)
        document.getElementById("KPIBuffer").innerHTML = KPIBuffer.Value_.toFixed(0);

        if (KPIBuffer.Indicator == 1) {
            document.getElementById("KPIBuffer").style.color = 'rgb(96, 178, 105)'
        } else {
            if (KPIBuffer.Indicator == 2) {
                document.getElementById("KPIBuffer").style.color = 'rgb(225, 169, 62)'
            } else {
                document.getElementById("KPIBuffer").style.color = 'rgb(214, 0, 28)'
            }
        }
    }
    
    /* //TURNO

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
    document.getElementById("KPIBuffer-MC").innerHTML = buffer7.Value_.toFixed(0);

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

    console.log(json) */

    //DIA
    /*id = 100004401
    const buffer2 = getBufferById(json, id)
    document.getElementById("KPIRealDia").innerHTML = buffer2.Value_;*/
}
