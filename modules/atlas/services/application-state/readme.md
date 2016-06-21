| URL parameter | State variable                  | hasDefaultValue        |
|---------------|---------------------------------|------------------------|
| zoek          | search.query || search.location | no, null               |
| lat           | map.viewCenter[0]               | yes, see DEFAULT_STATE |
| lon           | map.viewCenter[1]               | yes, see DEFAULT_STATE |
| basiskaart    | map.baseLayer                   | yes, see DEFAULT_STATE |
| lagen         | map.overlays                    | no, []                 |
| zoom          | map.zoom                        | yes, see DEFAULT_STATE |
| selectie      | map.highlight                   | no, null               |
| pagina        | page                            | yes, see DEFAULT_STATE |
| detail        | detail.uri                      | no, detail is null     |
| id            | straatbeeld.id                  | no                     |
| heading       | straatbeeld.heading             | no                     |
| pitch         | straatbeeld.pitch               | no                     |
| fov           | straatbeeld.fov                 | no                     |
