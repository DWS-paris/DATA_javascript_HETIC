# Mise en place d'un serveur NodeJS

```
sepal_length,sepal_width,petal_length,petal_width,type
4.7,3.2,1.3,0.2,setosa
5.6,2.5,3.9,1.1,versicolor
6.2,3.4,5.4,2.3,virginica
```


```json
{
    "sepal_length":5,
    "sepal_width":3.4,
    "petal_length":1.5,
    "petal_width":0.2,
    "type":"setosa"
},
{
    "sepal_length":5.2,
    "sepal_width":2.7,
    "petal_length":3.9,
    "petal_width":1.4,
    "type":"versicolor"
},
{
    "sepal_length":6.3,
    "sepal_width":3.4,
    "petal_length":5.6,
    "petal_width":2.4,
    "output":"virginica"
},
```

```js
outputs = ['setosa', 'versicolor', 'virginica' ]
{
    input: [ 5, 3.4, 1.5, 0.2 ],
    output: [1, 0, 0]
},
{
    input: [ 5.2, 2.7, 3.9, 1.4 ],
    output: [0, 1, 0]
},
{
    input: [ 6.3, 3.4, 5.6, 2.4],
    output: [0, 0, 1]
}
```