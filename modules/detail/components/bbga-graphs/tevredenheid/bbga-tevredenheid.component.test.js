describe('The dp-bbga-tevredenheid component', function () {
  var $compile,
    $rootScope,
    $q,
    bbgaDataService,
    hasBbgaData,
    mockedBbgaData = {
      VAR_A: {
        meta: {
          jaar: 2019
        },
        data: [
          {
            waarde: 7
          },
          {
            waarde: 7.4
          }
        ]
      },
      VAR_B: {
        meta: {
          jaar: 2019
        },
        data: [
          {
            waarde: 6.5
          },
          {
            waarde: 6.3
          }
        ]
      },
      VAR_C: {
        meta: {
          jaar: 2019
        },
        data: [
          {
            waarde: null
          },
          {
            waarde: 8.2
          }
        ]
      }
    },
    mockedBbgaMissingData;

  beforeEach(function () {
    hasBbgaData = true;

    mockedBbgaMissingData = angular.copy(mockedBbgaData);

    mockedBbgaMissingData.VAR_A.data[0].waarde = null;
    mockedBbgaMissingData.VAR_B.data[0].waarde = null;

    angular.mock.module(
      'atlasDetail',
      {
        bbgaDataService: {
          getGraphData: function () {
            var q = $q.defer();

            q.resolve(hasBbgaData ? mockedBbgaData : mockedBbgaMissingData);

            return q.promise;
          }
        }
      },
      function ($provide) {
        $provide.constant('BBGA_TEVREDENHEID_CONFIG', [
          {
            label: 'Variabele A',
            variable: 'VAR_A'
          },
          {
            label: 'Variabele B',
            variable: 'VAR_B'
          },
          {
            label: 'Variabele C',
            variable: 'VAR_C'
          }
        ]);
      }
    );

    angular.mock.inject(function (_$compile_, _$rootScope_, _$q_, _bbgaDataService_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $q = _$q_;
      bbgaDataService = _bbgaDataService_;
    });
  });

  function getComponent (gebiedHeading, gebiedCode) {
    var component,
      element,
      scope;

    element = document.createElement('dp-bbga-tevredenheid');
    element.setAttribute('gebied-heading', gebiedHeading);
    element.setAttribute('gebied-code', gebiedCode);

    scope = $rootScope.$new();

    component = $compile(element)(scope);
    scope.$apply();

    return component;
  }

  it('loads the data from the bbgaData service', function () {
    spyOn(bbgaDataService, 'getGraphData').and.callThrough();

    getComponent('Naam van het gebied', 'GEB12A');

    expect(bbgaDataService.getGraphData).toHaveBeenCalledWith('TEVREDENHEID', 'Naam van het gebied', 'GEB12A');
  });

  it('shows a header with the year of the data', function () {
    var component = getComponent();

    expect(component.find('.tevredenheid__header').text()).toBe('Rapportcijfers 2019');
  });

  it('shows a table with a row for each grade from the BBGA API', function () {
    var component = getComponent();

    expect(component.find('.bbga-table tr:nth-child(1) th').text()).toBe('Variabele A');
    expect(component.find('.bbga-table tr:nth-child(2) th').text()).toBe('Variabele B');
  });

  it('doesn\'t show a row for missing data', function () {
    var component = getComponent();

    expect(component.find('.bbga-table').text()).not.toContain('Variabele C');
  });

  xit('formats the grades in the Dutch locale with one decimal', function () {
    var component = getComponent();

    //Variabele A
    expect(component.find('.bbga-table tr:nth-child(1) td:nth-of-type(1)').text()).toBe('7,0');
    expect(component.find('.bbga-table tr:nth-child(1) td:nth-of-type(2)').text()).toBe('7,4');

    //Variabele B
    expect(component.find('.bbga-table tr:nth-child(2) td:nth-of-type(1)').text()).toBe('6,5');
    expect(component.find('.bbga-table tr:nth-child(2) td:nth-of-type(2)').text()).toBe('6,3');
  });

  it('adds colored badges to the cells with values', function () {
    var component = getComponent();

    expect(component.find('.bbga-table tr:nth-child(1) td:nth-of-type(1) .badge--gray').length).toBe(1);
    expect(component.find('.bbga-table tr:nth-child(1) td:nth-of-type(2) .badge--red').length).toBe(1);

    expect(component.find('.bbga-table tr:nth-child(2) td:nth-of-type(1) .badge--gray').length).toBe(1);
    expect(component.find('.bbga-table tr:nth-child(2) td:nth-of-type(2) .badge--red').length).toBe(1);
  });

  it('adds a legend with the name of the gebied', function () {
    var component = getComponent('Naam van de buurt');

    expect(component.find('.tevredenheid__legend div:nth-child(1) .badge--gray').length).toBe(1);
    expect(component.find('.tevredenheid__legend div:nth-child(1)').text().trim()).toBe('Naam van de buurt');

    expect(component.find('.tevredenheid__legend div:nth-child(2) .badge--red').length).toBe(1);
    expect(component.find('.tevredenheid__legend div:nth-child(2)').text().trim()).toBe('Amsterdam');
  });

  it('doesn\'t show anything if there are no known grades from the BBGA API', function () {
    var component;

    component = getComponent('Naam van de buurt');
    expect(component.find('h2').length).toBe(1);
    expect(component.find('.tevredenheid__header').length).toBe(1);
    expect(component.find('.bbga-table').length).toBe(1);
    expect(component.find('.tevredenheid__legend').length).toBe(1);
    expect(component.find('p').length).toBe(1);

    hasBbgaData = false;
    component = getComponent('Naam van de buurt');

    expect(component.find('h2').length).toBe(0);
    expect(component.find('.tevredenheid__header').length).toBe(0);
    expect(component.find('.bbga-table').length).toBe(0);
    expect(component.find('.tevredenheid__legend').length).toBe(0);
    expect(component.find('p').length).toBe(0);
  });
});
