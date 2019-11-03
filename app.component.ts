import { Component } from '@angular/core';
import * as jp from 'jsonpath';
import * as traverse from 'traverse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poc';
  data;
  template;
  test() {

    var store = {
      "store": {
        "book": [
          {
            "category": "reference",
            "author": "Nigel Rees",
            "title": "Sayings of the Century",
            "price": 8.95
          }, {
            "category": "fiction",
            "author": "EvelynWaugh",
            "title": "Sword of Honour",
            "price": 12.99
          }, {
            "category": "fiction",
            "author": "b",
            "title": "Moby Dick",
            "isbn": "0-553-21311-3",
            "price": 8.99
          }, {
            "category": "fiction",
            "author": "a",
            "title": "The Lord of the Rings",
            "isbn": "0-395-19395-8",
            "price": 22.99
          }
        ],
        "bicycle": {
          "color": "red",
          "price": 19.95
        }
      }
    };

    var finaltemplate = {
      price:
      { p: '$..price' }
      ,
      bicycle: {
        book: '$..book[2]'
      }
    }


    var one = {
      "Tags": [
        {
          "name": "t1"
        },
        {
          "name": "t2"
        },
        {
          "name": "t3"
        }
      ],
      "first": {
        "second": "hi"
      }
    }

    console.log("jp.query(store, x)=========", jp.query(one, '$.Tags..name'))

    // let value;let values;
    traverse(finaltemplate).forEach(function (x) {

      if (typeof (this.key) !== "undefined" && this.key !== "0") {
        //console.log("x=*****=", x);
        if (x.constructor.name === 'String') {

          var value = jp.query(store, x);
          console.log("string==", x, this.key, value);
          this.update(value, true)
        }
        if (x.constructor.name === 'Array') {
          for (var i = 0; i < x.length; i++) {

            if (x[i].constructor.name === 'String') {
              var values = jp.query(store, x[i]);
              this.update(values, true)
              //  console.log("string=ifffffff=", x[i], this.key, values);
            }

          }

        }
      }

    });


    console.log(finaltemplate);
  }
}
