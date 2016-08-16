(function(){
    'use strict';

    angular
        .module('dpShared')
        .constant('OVERLAYS', {
            SOURCES: {
                kadaster: {
                    label: 'Kadastrale perceelgrenzen',
                    url: 'maps/lki?service=wms',
                    layers: ['kadaster'],
                    minZoom: 8,
                    maxZoom: 16
                },
                gemeentelijke_beperkingen: {
                    label: 'Gemeentelijke beperkingen',
                    url: 'maps/wkpb&service=wms',
                    layers: ['wkpb'],
                    minZoom: 12,
                    maxZoom: 16,
                    legend: '/maps/wkpb?version=1.3.0&service=WMS&request=GetLegend' +
                        'Graphic&sld_version=1.1.0&layer=wkpb&format=image/png&STYLE=default'
                },
                stadsdeel: {
                    label: 'Stadsdelen',
                    url: 'maps/gebieden?service=wms',
                    layers: ['stadsdeel', 'stadsdeel_label'],
                    minZoom: 8,
                    maxZoom: 16
                },
                buurtcombinatie: {
                    label: 'Buurtcombinaties',
                    url: 'maps/gebieden?service=wms',
                    layers: ['buurtcombinatie', 'buurtcombinatie_label'],
                    minZoom: 8,
                    maxZoom: 16
                },
                buurt: {
                    label: 'Buurten',
                    url: 'maps/gebieden?service=wms',
                    layers: ['buurt', 'buurt_label'],
                    minZoom: 10,
                    maxZoom: 16
                },
                gebiedsgericht_werken: {
                    label: 'Gebiedsgerichtwerken gebieden',
                    url: 'maps/gebieden?service=wms',
                    layers: ['gebiedsgerichtwerken', 'gebiedsgerichtwerken_label'],
                    minZoom: 8,
                    maxZoom: 16
                },
                grootstedelijkgebied: {
                    label: 'Grootstedelijke gebieden',
                    url: 'maps/gebieden?service=wms',
                    layers: ['grootstedelijkgebied', 'grootstedelijkgebied_label'],
                    minZoom: 8,
                    maxZoom: 16
                },
                bouwblokken: {
                    label: 'Bouwblokken',
                    url: 'maps/gebieden?service=wms',
                    layers: ['bouwblok', 'bouwblok_label'],
                    minZoom: 11,
                    maxZoom: 16
                },
                unesco: {
                    label: 'Unesco werelderfgoed',
                    url: 'maps/gebieden?service=wms',
                    layers: ['unesco', 'unesco_label'],
                    minZoom: 9,
                    maxZoom: 16,
                    legend: '/maps/gebieden?version=1.3.0&service=WMS&request=GetLe' +
                        'ge=ndGraphic&sld_version=1.1.0&layer=unesco&format=image/png&STYLE=default'
                },
                dsm: {
                    label: 'Terreinmodel (DSM AHN)',
                    url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
                    layers: ['ahn3_05m_dsm'],
                    minZoom: 10,
                    maxZoom: 16,
                    legend: 'https://geodata.nationaalgeoregister.nl/ahn3/ows?service=WMS&request=GetLegendGraphic&fo' +
                        'rmat=image%2Fpng&width=20&height=20&layer=ahn3_05m_dsm&style=ahn3_05m',
                    external: true
                },
                dtm: {
                    label: 'Oppervlaktemodel (DTM AHN)',
                    url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
                    layers: ['ahn3_05m_dtm'],
                    minZoom: 10,
                    maxZoom: 16,
                    legend: 'https://geodata.nationaalgeoregister.nl/ahn3/ows?service=WMS&request=GetLegendGraphic&fo' +
                        'rmat=image%2Fpng&width=20&height=20&layer=ahn3_05m_dtm&style=ahn3_05m',
                    external: true
                },
                bestemmingsplannen: {
                    label: 'Bestemmingsplannen',
                    url: 'http://afnemers.ruimtelijkeplannen.nl/afnemers/services',
                    layers: ['BP:HuidigeBestemming'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: 'http://www.ruimtelijkeplannen.nl/web-theme2.0/images/mapviewer/legend.png',
                    external: true
                },
                nap: {
                    label: 'Normaal Amsterdams Peil (NAP)',
                    url: 'maps/nap&service=wms',
                    layers: ['peilmerk_hoogte', 'peilmerk_label'],
                    minZoom: 10,
                    maxZoom: 16,
                    legend: '/maps/nap?version=1.3.0&service=WMS&request=GetLegendG' +
                        'raphic&sld_version=1.1.0&layer=NAP&format=image/png&STYLE=default'
                },
                meetbouten_status: {
                    label: 'Meetbouten - Status',
                    url: 'maps/meetbouten?service=wms',
                    layers: ['meetbouten_status', 'meetbouten_labels'],
                    minZoom: 11,
                    maxZoom: 16,
                    legend: '/maps/meetbouten?version=1.3.0&service=WMS&request=Get' +
                        'LegendGraphic&sld_version=1.1.0&layer=meetbouten_status&format=image/png&STYLE=default'
                },
                meetbouten_zaksnelheid: {
                    label: 'Meetbouten - Zaksnelheid',
                    url: 'maps/meetbouten?service=wms',
                    layers: ['meetbouten_zaksnelheid', 'meetbouten_labels'],
                    minZoom: 11,
                    maxZoom: 16,
                    legend: '/maps/meetbouten?version=1.3.0&service=WMS&request=Get' +
                        'LegendGraphic&sld_version=1.1.0&layer=meetbouten_zaksnelheid&format=image/png&STYLE=default'
                },
                meetbouten_referentiepunten: {
                    label: 'Meetbouten - Referentiepunten',
                    url: 'maps/meetbouten&service=wms',
                    layers: ['referentiepunten'],
                    minZoom: 11,
                    maxZoom: 16,
                    legend: '/maps/meetbouten?version=1.3.0&service=WMS&request=Get' +
                        'LegendGraphic&sld_version=1.1.0&layer=referentiepunten&format=image/png&STYLE=default'
                },
                panorama_rijlijnen_2012: {
                    label: 'panorama rijlijnen 2012',
                    url: 'maps/panorama&service=wms',
                    layers: ['panorama'],
                    minZoom: 11,
                    maxZoom: 16,
                    legend: '/maps/panorama?version=1.3.0&service=WMS&request=GetLe' +
                        'gendGraphic&sld_version=1.1.0&layer=panorama_punt&format=image/png&STYLE=default'
                },
                milieu_bodem_grondmonsters: {
                    label: 'Grondmonster',
                    url: 'maps/bodem&service=wms',
                    layers: ['grondmonsters'],
                    minZoom: 10,
                    maxZoom: 16,
                    legend: '/maps/bodem?version=1.3.0&service=WMS&request=GetLegen' +
                        'dGraphic&sld_version=1.1.0&layer=grondmonsters&format=image/png&STYLE=default'
                },
                milieu_bodem_grondwatermonsters: {
                    label: 'Grondwatermonster',
                    url: 'maps/bodem&service=wms',
                    layers: ['grondwatermonsters'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/bodem?version=1.3.0&service=WMS&request=GetLegen' +
                        'dGraphic&sld_version=1.1.0&layer=grondwatermonsters&format=image/png&STYLE=default'
                },
                milieu_bodem_asbest_in_grond: {
                    label: 'Asbest in grond',
                    url: 'maps/bodem&service=wms',
                    layers: ['asbest'],
                    minZoom: 10,
                    maxZoom: 16,
                    legend: '/maps/bodem?version=1.3.0&service=WMS&request=GetLegen' +
                        'dGraphic&sld_version=1.1.0&layer=asbest&format=image/png&STYLE=default'
                },
                milieu_veiligheid_lpg_vulpunt: {
                    label: 'LPG-vulpunt - Risicozones',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: [
                        'lpgvulpuntinvloedsgebied',
                        'lpgvulpuntplaatsgebondenrisico106',
                        'lpgvulpuntplaatsgebondenrisico105',
                        'lpgvulpuntlocaties'
                    ],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_vulpunt&format=image/png&' +
                        'STYLE=default'
                },
                milieu_veiligheid_lpg_afleverzuil: {
                    label: 'LPG-afleverzuil - Risicozones',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['milieu_veiligheid_lpg_afleverzuil'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_afleverzuil&format=image/' +
                        'png&STYLE=default'
                },
                milieu_veiligheid_lpg_tank: {
                    label: 'LPG-tank - Risicozones',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['lpgtankinvloedsgebied', 'lpgtankplaatsgebondenrisico', 'lpgtankligging'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_tank&format=image/png&STY' +
                        'LE=default'
                },
                milieu_veiligheid_lpg_station: {
                    label: 'LPG-station - Risicozones',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['lpgstationcontouren', 'lpgstationslocaties'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_station&format=image/png&' +
                        'STYLE=default'
                },
                milieu_veiligheid_bron: {
                    label: 'Bron - Risicozones',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['overigerisicobedrijven'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=overigerisicobedrijven&format=image/png&STYLE=d' +
                        'efault'
                },
                milieu_veiligheid_bedrijf: {
                    label: 'Bedrijf - Risicozones',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['milieu_veiligheid_bedrijf'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_bedrijf&format=image/png&STYL' +
                        'E=default'
                },
                milieu_veiligheid_aardgasbuisleidingen: {
                    label: 'Aardgasbuisleid. - Risicozones',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['milieu_veiligheid_aardgasbuisleidingen'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_aardgasbuisleidingen&format=i' +
                        'mage/png&STYLE=default'
                },
                milieu_veiligheid_spoorwegen: {
                    label: 'Spoorwegen - Risicozones',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['risicozonesspoorweg'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=risicozonesspoorweg&format=image/png&STYLE=defa' +
                        'ult'
                },
                milieu_veiligheid_vaarwegen: {
                    label: 'Vaarwegen - Risicozones',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['risicozonesvaarweg'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=risicozonesvaarweg&format=image/png&STYLE=default'
                },
                milieu_veiligheid_wegen: {
                    label: 'Wegen - Risicozones',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['risicozonesweg'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=risicozonesweg&format=image/png&STYLE=default'
                },
                milieu_veiligheid_vuurwerkopslag: {
                    label: 'Vuurwerkopslag - Veilig.afst.',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['milieu_veiligheid_vuurwerk'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_vuurwerk&format=image/png&STY' +
                        'LE=default'
                },
                milieu_veiligheid_munitieopslag: {
                    label: 'Munitieopslag - Veilig.afst.',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['milieu_veiligheid_munitie'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_munitie&format=image/png&STYL' +
                        'E=default'
                },
                milieu_veiligheid_gasdrukregel_en_meetstations: {
                    label: 'Gasdruk...stations - Veilig.afst.',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['milieu_veiligheid_gasdrukregel_meetstation'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_gasdrukregel_meetstation&form' +
                        'at=image/png&STYLE=default'
                },
                milieu_veiligheid_sluis: {
                    label: 'Sluis - Veilig.afst.',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['milieu_veiligheid_sluis'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_sluis&format=image/png&STYLE=' +
                        'default'
                },
                milieu_veiligheid_wachtplaatsen: {
                    label: 'Wachtplaatsen - Veilig.afst.',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['milieu_veiligheid_wachtplaats'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_wachtplaats&format=image/png&' +
                        'STYLE=default'
                },
                milieu_veiligheid_bunkerschepen: {
                    label: 'Bunkerschepen - Veilig.afst.',
                    url: 'maps/externeveiligheid&service=wms',
                    layers: ['milieu_veiligheid_bunkerschepen'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
                        'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_bunkerschepen&format=image/pn' +
                        'g&STYLE=default'
                },
                milieu_veiligheid_vogelvrijwaringsgebied_schiphol: {
                    label: 'Schiphol - Vogelvrijwaring',
                    url: 'maps/planologischezonesschiphol&service=wms',
                    layers: ['vogelvrijwaringsgebiedschiphol'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/planologischezonesschiphol?version=1.3.0&service' +
                        '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=vogelvrijwaringsgebiedschiphol&format=' +
                        'image/png&STYLE=default'
                },
                milieu_geluid_planologisch_schiphol: {
                    label: 'Schiphol',
                    url: 'maps/planologischezonesschiphol&service=wms',
                    layers: ['geluidszoneschiphol'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/planologischezonesschiphol?version=1.3.0&service' +
                        '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=geluidszoneschiphol&format=image/png&S' +
                        'TYLE=default'
                },
                milieu_hoogtebeperkende_vlakken: {
                    label: 'Schiphol - Hoogtebeperking',
                    url: 'maps/planologischezonesschiphol&service=wms',
                    layers: ['hoogtebeperkingschiphol'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/planologischezonesschiphol?version=1.3.0&service' +
                        '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=hoogtebeperkingschiphol&format=image/p' +
                        'ng&STYLE=default'
                },
                milieu_geluid_planologisch_spoorwegen: {
                    label: 'Spoorwegen - Geluidszones',
                    url: 'maps/planologischegeluidszones&service=wms',
                    layers: ['spoorwegen'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/planologischegeluidszones?version=1.3.0&service=' +
                        'WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=spoorwegen&format=image/png&STYLE=default'
                },
                milieu_geluid_planologisch_metro: {
                    label: 'Metro - Geluidszones',
                    url: 'maps/planologischegeluidszones&service=wms',
                    layers: ['metro'],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/planologischegeluidszones?version=1.3.0&service=' +
                        'WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=metro&format=image/png&STYLE=default'
                },
                milieu_geluid_planologisch_industrie: {
                    label: 'Industrie - Geluidszones',
                    url: 'maps/planologischegeluidszones&service=wms',
                    layers: [
                        'gezoneerdindustrieterrein',
                        'geluidzoneindustrieterrein',
                        'indicatievecontour55dbindustrieterrein'
                    ],
                    minZoom: 8,
                    maxZoom: 16,
                    legend: '/maps/planologischegeluidszones?version=1.3.0&service=' +
                        'WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=milieu_geluid_planologisch_industrie&fo' +
                        'rmat=image/png&STYLE=default'
                },
                parkeervakken: {
                    label: 'Parkeervakken',
                    url: 'maps/parkeervakken&service=wms',
                    layers: ['alle_parkeervakken', 'parkeervakken_label'],
                    minZoom: 10,
                    maxZoom: 16
                },
                parkeervakken_bord: {
                    label: 'Parkeervakken - Borden',
                    url: 'maps/parkeervakken&service=wms',
                    layers: ['alle_parkeervakken', 'parkeervakken_bord'],
                    minZoom: 10,
                    maxZoom: 16
                },
                parkeervakken_reservering: {
                    label: 'Parkeervakken - Gereserveerd',
                    url: 'maps/parkeervakken&service=wms',
                    layers: ['parkeervakken_reservering', 'parkeervakken_reservering_label'],
                    minZoom: 11,
                    maxZoom: 16,
                    legend: '/maps/parkeervakken?version=1.3.0&service=WMS&request=' +
                        'GetLegendGraphic&sld_version=1.1.0&layer=parkeervakken_reservering&format=image/png&STYLE=de' +
                        'fault'
                }
            },
            HIERARCHY: [
                {
                    heading: 'Geografie: gebieden',
                    overlays: [
                        'grootstedelijkgebied',
                        'unesco',
                        'stadsdeel',
                        'gebiedsgericht_werken',
                        'buurtcombinatie',
                        'buurt',
                        'bouwblokken'
                    ]
                }, {
                    heading: 'Geografie: hoogte',
                    overlays: [
                        'dsm',
                        'dtm',
                        'nap',
                        'meetbouten_status',
                        'meetbouten_zaksnelheid',
                        'meetbouten_referentiepunten'
                    ]
                }, {
                    heading: 'Onroerende zaken',
                    overlays: [
                        'kadaster',
                        'gemeentelijke_beperkingen'
                    ]
                }, {
                    heading: 'Milieu: bodem',
                    overlays: [
                        'milieu_bodem_grondmonsters',
                        'milieu_bodem_grondwatermonsters',
                        'milieu_bodem_asbest_in_grond'
                    ]
                }, {
                    heading: 'Milieu: veiligheid',
                    overlays: [
                        'milieu_veiligheid_lpg_vulpunt',
                        'milieu_veiligheid_lpg_afleverzuil',
                        'milieu_veiligheid_lpg_tank',
                        'milieu_veiligheid_lpg_station',
                        'milieu_veiligheid_bron',
                        'milieu_veiligheid_bedrijf',
                        'milieu_veiligheid_aardgasbuisleidingen',
                        'milieu_veiligheid_spoorwegen',
                        'milieu_veiligheid_vaarwegen',
                        'milieu_veiligheid_wegen',
                        'milieu_veiligheid_vuurwerkopslag',
                        'milieu_veiligheid_munitieopslag',
                        'milieu_veiligheid_gasdrukregel_en_meetstations',
                        'milieu_veiligheid_sluis',
                        'milieu_veiligheid_wachtplaatsen',
                        'milieu_veiligheid_bunkerschepen'
                    ]
                }, {
                    heading: 'Milieu: zones',
                    overlays: [
                        'milieu_geluid_planologisch_industrie',
                        'milieu_geluid_planologisch_spoorwegen',
                        'milieu_geluid_planologisch_metro',
                        'milieu_geluid_planologisch_schiphol',
                        'milieu_hoogtebeperkende_vlakken',
                        'milieu_veiligheid_vogelvrijwaringsgebied_schiphol'
                    ]
                }, {
                    heading: 'Verkeer',
                    overlays: [
                        'parkeervakken',
                        'parkeervakken_bord',
                        'parkeervakken_reservering'
                    ]
                }
            ]
        });
})();

