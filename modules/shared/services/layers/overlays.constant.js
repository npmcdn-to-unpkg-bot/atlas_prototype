(function(){
    'use strict';

    angular
        .module('dpShared')
        .constant('OVERLAYS', {
            kadaster: {
                label: 'Kadastrale perceelgrenzen',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/lki.map&service=wms',
                layers: ['kadaster'],
                minZoom: 8,
                maxZoom: 16
            },
            gemeentelijke_beperkingen: {
                label: 'Gemeentelijke beperkingen',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/wkpb.map&service=wms',
                layers: ['wkpb'],
                minZoom: 12,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/wkpb.map&version=1.3.0&service=WMS&request=GetLegendGrap' +
                    'hic&sld_version=1.1.0&layer=wkpb&format=image/png&STYLE=default'
            },
            stadsdeel: {
                label: 'Stadsdelen',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/gebieden.map&service=wms',
                layers: ['stadsdeel', 'stadsdeel_label'],
                minZoom: 8,
                maxZoom: 16
            },
            buurtcombinatie: {
                label: 'Buurtcombinaties',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/gebieden.map&service=wms',
                layers: ['buurtcombinatie', 'buurtcombinatie_label'],
                minZoom: 8,
                maxZoom: 16
            },
            buurt: {
                label: 'Buurten',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/gebieden.map&service=wms',
                layers: ['buurt', 'buurt_label'],
                minZoom: 10,
                maxZoom: 16
            },
            gebiedsgericht_werken: {
                label: 'Gebiedsgerichtwerken gebieden',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/gebieden.map&service=wms',
                layers: ['gebiedsgerichtwerken', 'gebiedsgerichtwerken_label'],
                minZoom: 8,
                maxZoom: 16
            },
            grootstedelijkgebied: {
                label: 'Grootstedelijke gebieden',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/gebieden.map&service=wms',
                layers: ['grootstedelijkgebied', 'grootstedelijkgebied_label'],
                minZoom: 8,
                maxZoom: 16
            },
            bouwblokken: {
                label: 'Bouwblokken',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/gebieden.map&service=wms',
                layers: ['bouwblok', 'bouwblok_label'],
                minZoom: 11,
                maxZoom: 16
            },
            unesco: {
                label: 'Unesco werelderfgoed',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/gebieden.map&service=wms',
                layers: ['unesco', 'unesco_label'],
                minZoom: 9,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/gebieden.map&version=1.3.0&service=WMS&request=GetLege=n' +
                    'dGraphic&sld_version=1.1.0&layer=unesco&format=image/png&STYLE=default'
            },
            dsm: {
                label: 'Terreinmodel (DSM AHN)',
                url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
                layers: ['ahn3_05m_dsm'],
                minZoom: 10,
                maxZoom: 16,
                legend: 'https://geodata.nationaalgeoregister.nl/ahn3/ows?service=WMS&request=GetLegendGraphic&format' +
                    '=image%2Fpng&width=20&height=20&layer=ahn3_05m_dsm&style=ahn3_05m',
                external: true
            },
            dtm: {
                label: 'Oppervlaktemodel (DTM AHN)',
                url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
                layers: ['ahn3_05m_dtm'],
                minZoom: 10,
                maxZoom: 16,
                legend: 'https://geodata.nationaalgeoregister.nl/ahn3/ows?service=WMS&request=GetLegendGraphic&format' +
                    '=image%2Fpng&width=20&height=20&layer=ahn3_05m_dtm&style=ahn3_05m',
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
                url: '/cgi-bin/mapserv?map=/srv/mapserver/nap.map&service=wms',
                layers: ['peilmerk_hoogte', 'peilmerk_label'],
                minZoom: 10,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/nap.map&version=1.3.0&service=WMS&request=GetLegendGraph' +
                    'ic&sld_version=1.1.0&layer=NAP&format=image/png&STYLE=default'
            },
            meetbouten_status: {
                label: 'Meetbouten - Status',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/meetbouten.map&service=wms',
                layers: ['meetbouten_status', 'meetbouten_labels'],
                minZoom: 11,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/meetbouten.map&version=1.3.0&service=WMS&request=GetLege' +
                    'ndGraphic&sld_version=1.1.0&layer=meetbouten_status&format=image/png&STYLE=default'
            },
            meetbouten_zaksnelheid: {
                label: 'Meetbouten - Zaksnelheid',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/meetbouten.map&service=wms',
                layers: ['meetbouten_zaksnelheid', 'meetbouten_labels'],
                minZoom: 11,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/meetbouten.map&version=1.3.0&service=WMS&request=GetLege' +
                    'ndGraphic&sld_version=1.1.0&layer=meetbouten_zaksnelheid&format=image/png&STYLE=default'
            },
            meetbouten_referentiepunten: {
                label: 'Meetbouten - Referentiepunten',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/meetbouten.map&service=wms',
                layers: ['referentiepunten'],
                minZoom: 11,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/meetbouten.map&version=1.3.0&service=WMS&request=GetLege' +
                    'ndGraphic&sld_version=1.1.0&layer=referentiepunten&format=image/png&STYLE=default'
            },
            panorama_rijlijnen_2012: {
                label: 'panorama rijlijnen 2012',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/panorama.map&service=wms',
                layers: ['panorama'],
                minZoom: 11,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/panorama.map&version=1.3.0&service=WMS&request=GetLegend' +
                    'Graphic&sld_version=1.1.0&layer=panorama_punt&format=image/png&STYLE=default'
            },
            milieu_bodem_grondmonsters: {
                label: 'Grondmonster',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/bodem.map&service=wms',
                layers: ['grondmonsters'],
                minZoom: 10,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/bodem.map&version=1.3.0&service=WMS&request=GetLegendGra' +
                    'phic&sld_version=1.1.0&layer=grondmonsters&format=image/png&STYLE=default'
            },
            milieu_bodem_grondwatermonsters: {
                label: 'Grondwatermonster',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/bodem.map&service=wms',
                layers: ['grondwatermonsters'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/bodem.map&version=1.3.0&service=WMS&request=GetLegendGra' +
                    'phic&sld_version=1.1.0&layer=grondwatermonsters&format=image/png&STYLE=default'
            },
            milieu_bodem_asbest_in_grond: {
                label: 'Asbest in grond',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/bodem.map&service=wms',
                layers: ['asbest'],
                minZoom: 10,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/bodem.map&version=1.3.0&service=WMS&request=GetLegendGra' +
                    'phic&sld_version=1.1.0&layer=asbest&format=image/png&STYLE=default'
            },
            milieu_veiligheid_lpg_vulpunt: {
                label: 'LPG-vulpunt - Risicozones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: [
                    'lpgvulpuntinvloedsgebied',
                    'lpgvulpuntplaatsgebondenrisico106',
                    'lpgvulpuntplaatsgebondenrisico105',
                    'lpgvulpuntlocaties'
                ],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_vulpunt&format=image/png&STYLE=de' +
                    'fault'
            },
            milieu_veiligheid_lpg_afleverzuil: {
                label: 'LPG-afleverzuil - Risicozones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['milieu_veiligheid_lpg_afleverzuil'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_afleverzuil&format=image/png&STYL' +
                    'E=default'
            },
            milieu_veiligheid_lpg_tank: {
                label: 'LPG-tank - Risicozones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['lpgtankinvloedsgebied', 'lpgtankplaatsgebondenrisico', 'lpgtankligging'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_tank&format=image/png&STYLE=default'
            },
            milieu_veiligheid_lpg_station: {
                label: 'LPG-station - Risicozones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['lpgstationcontouren', 'lpgstationslocaties'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_station&format=image/png&STYLE=de' +
                    'fault'
            },

            // overige risicobedrijven

            milieu_veiligheid_bron: {
                label: 'Bron - Risicozones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['overigerisicobedrijven'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=overigerisicobedrijven&format=image/png&STYLE=default'
            },

            milieu_veiligheid_bedrijf: {
                label: 'Bedrijf - Risicozones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['milieu_veiligheid_bedrijf'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_bedrijf&format=image/png&STYLE=default'
            },
            milieu_veiligheid_aardgasbuisleidingen: {
                label: 'Aardgasbuisleid. - Risicozones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['milieu_veiligheid_aardgasbuisleidingen'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_aardgasbuisleidingen&format=image/png' +
                    '&STYLE=default'
            },
            milieu_veiligheid_spoorwegen: {
                label: 'Spoorwegen - Risicozones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['risicozonesspoorweg'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=risicozonesspoorweg&format=image/png&STYLE=default'
            },
            milieu_veiligheid_vaarwegen: {
                label: 'Vaarwegen - Risicozones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['risicozonesvaarweg'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=risicozonesvaarweg&format=image/png&STYLE=default'
            },
            milieu_veiligheid_wegen: {
                label: 'Wegen - Risicozones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['risicozonesweg'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=risicozonesweg&format=image/png&STYLE=default'
            },
            milieu_veiligheid_vuurwerkopslag: {
                label: 'Vuurwerkopslag - Veilig.afst.',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['milieu_veiligheid_vuurwerk'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_vuurwerk&format=image/png&STYLE=default'
            },
            milieu_veiligheid_munitieopslag: {
                label: 'Munitieopslag - Veilig.afst.',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['milieu_veiligheid_munitie'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_munitie&format=image/png&STYLE=default'
            },
            milieu_veiligheid_gasdrukregel_en_meetstations: {
                label: 'Gasdruk...stations - Veilig.afst.',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['milieu_veiligheid_gasdrukregel_meetstation'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_gasdrukregel_meetstation&format=image' +
                    '/png&STYLE=default'
            },
            milieu_veiligheid_sluis: {
                label: 'Sluis - Veilig.afst.',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['milieu_veiligheid_sluis'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_sluis&format=image/png&STYLE=default'
            },
            milieu_veiligheid_wachtplaatsen: {
                label: 'Wachtplaatsen - Veilig.afst.',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['milieu_veiligheid_wachtplaats'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_wachtplaats&format=image/png&STYLE=de' +
                    'fault'
            },
            milieu_veiligheid_bunkerschepen: {
                label: 'Bunkerschepen - Veilig.afst.',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&service=wms',
                layers: ['milieu_veiligheid_bunkerschepen'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/externeveiligheid.map&version=1.3.0&service=WMS&request=' +
                    'GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_bunkerschepen&format=image/png&STYLE=' +
                    'default'
            },
            milieu_veiligheid_vogelvrijwaringsgebied_schiphol: {
                label: 'Schiphol - Vogelvrijwaring',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/planologischezonesschiphol.map&service=wms',
                layers: ['vogelvrijwaringsgebiedschiphol'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/planologischezonesschiphol.map&version=1.3.0&service=WMS' +
                    '&request=GetLegendGraphic&sld_version=1.1.0&layer=vogelvrijwaringsgebiedschiphol&format=image/pn' +
                    'g&STYLE=default'
            },
            milieu_geluid_planologisch_schiphol: {
                label: 'Schiphol',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/planologischezonesschiphol.map&service=wms',
                layers: ['geluidszoneschiphol'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/planologischezonesschiphol.map&version=1.3.0&service=WMS' +
                    '&request=GetLegendGraphic&sld_version=1.1.0&layer=geluidszoneschiphol&format=image/png&STYLE=def' +
                    'ault'
            },
            milieu_hoogtebeperkende_vlakken: {
                label: 'Schiphol - Hoogtebeperking',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/planologischezonesschiphol.map&service=wms',
                layers: ['hoogtebeperkingschiphol'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/planologischezonesschiphol.map&version=1.3.0&service=WMS' +
                    '&request=GetLegendGraphic&sld_version=1.1.0&layer=hoogtebeperkingschiphol&format=image/png&STYLE' +
                    '=default'
            },
            milieu_geluid_planologisch_spoorwegen: {
                label: 'Spoorwegen - Geluidszones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/planologischegeluidszones.map&service=wms',
                layers: ['spoorwegen'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/planologischegeluidszones.map&version=1.3.0&service=WMS&' +
                    'request=GetLegendGraphic&sld_version=1.1.0&layer=spoorwegen&format=image/png&STYLE=default'
            },
            milieu_geluid_planologisch_metro: {
                label: 'Metro - Geluidszones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/planologischegeluidszones.map&service=wms',
                layers: ['metro'],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/planologischegeluidszones.map&version=1.3.0&service=WMS&' +
                    'request=GetLegendGraphic&sld_version=1.1.0&layer=metro&format=image/png&STYLE=default'
            },
            milieu_geluid_planologisch_industrie: {
                label: 'Industrie - Geluidszones',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/planologischegeluidszones.map&service=wms',
                layers: [
                    'gezoneerdindustrieterrein',
                    'geluidzoneindustrieterrein',
                    'indicatievecontour55dbindustrieterrein'
                ],
                minZoom: 8,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/planologischegeluidszones.map&version=1.3.0&service=WMS&' +
                    'request=GetLegendGraphic&sld_version=1.1.0&layer=milieu_geluid_planologisch_industrie&format=ima' +
                    'ge/png&STYLE=default'
            },
            parkeervakken: {
                label: 'Parkeervakken',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/parkeervakken.map&service=wms',
                layers: ['alle_parkeervakken', 'parkeervakken_label'],
                minZoom: 10,
                maxZoom: 16
            },
            parkeervakken_bord: {
                label: 'Parkeervakken - Borden',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/parkeervakken.map&service=wms',
                layers: ['alle_parkeervakken', 'parkeervakken_bord'],
                minZoom: 10,
                maxZoom: 16
            },
            parkeervakken_reservering: {
                label: 'Parkeervakken - Gereserveerd',
                url: '/cgi-bin/mapserv?map=/srv/mapserver/parkeervakken.map&service=wms',
                layers: ['parkeervakken_reservering', 'parkeervakken_reservering_label'],
                minZoom: 11,
                maxZoom: 16,
                legend: '/cgi-bin/mapserv?map=/srv/mapserver/parkeervakken.map&version=1.3.0&service=WMS&request=GetL' +
                    'egendGraphic&sld_version=1.1.0&layer=parkeervakken_reservering&format=image/png&STYLE=default'
            }
        });
})();
