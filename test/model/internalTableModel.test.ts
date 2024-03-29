/* eslint-disable no-new */
import { assert, expect } from 'chai';
import { InternalTableModel } from '../../src/model/InternalTableModel';
import { TitleContent, TextContent, ImageContent, TablePosition } from '../../src/model/types';


describe('InternalTableModel constructor', () => {

   it('instantiates an empty table of specified size for valid size arguments', () => {
      const rowTotal = 4;
      const columnTotal = 3;
      const table: (TitleContent | null)[][] = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null],
         [null, null, null]
      ];
      const obj = new InternalTableModel(rowTotal, columnTotal);
      assert.equal(obj.rowTotal, rowTotal);
      assert.equal(obj.columnTotal, columnTotal);
      assert.notEqual(obj.rowTotal, 2);
      assert.notEqual(obj.columnTotal, 2);
      assert.deepEqual(obj.getTableClone(), table);
   });


   it('throws a range error for invalid size arguments', () => {
      expect(() => new InternalTableModel(0, 0)).to.throw(RangeError, 'Arguments rowTotal and columnTotal must be greater than zero');
   });

});



describe('InternalTableModel.table', () => {

   it('sets table attribute to user input', () => {
      const obj = new InternalTableModel(2, 2);
      const table: (TitleContent | null)[][] = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null],
         [null, null, null]
      ];
      obj.table = table;

      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.columnTotal, 3);
      assert.equal(obj.rowTotal, 4);
   });

});



describe('InternalTableModel.addRowAt()', () => {

   it('add new row between existing rows', () => {
      const obj = new InternalTableModel(3, 2);
      assert.equal(obj.rowTotal, 3);
      obj.addRowAt(1);

      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null],
         [null, null],
         [null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
      assert.equal(obj.rowTotal, 4);
   });


   it('add new row at end of existing rows with index matching array length', () => {
      const obj = new InternalTableModel(4, 3);
      assert.equal(obj.rowTotal, 4);
      obj.addRowAt(3);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null],
         [null, null, null],
         [null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
      assert.equal(obj.rowTotal, 5);
   });


   it('add new row at end of existing rows with index exceeding array length', () => {
      const obj = new InternalTableModel(4, 3);
      assert.equal(obj.rowTotal, 4);
      obj.addRowAt(102);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null],
         [null, null, null],
         [null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
      assert.equal(obj.rowTotal, 5);
   });


   it('throws a range error for negative row index argument', () => {
      expect(() => new InternalTableModel(2, 2).addRowAt(-1)).to.throw(RangeError, 'Index must not be negative');
   });


   it('throws a range error for trying to add new first line (reserved for title elements)', () => {
      expect(() => new InternalTableModel(2, 2).addRowAt(0)).to.throw(RangeError, 'Can not add new first row due to it being reserved for title objects');
   });

});



describe('InternalTableModel.addColumnAt()', () => {

   it('add new first column', () => {
      const obj = new InternalTableModel(2, 2);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null]
      ];
      assert.equal(obj.columnTotal, 3);
      obj.addColumnAt(0);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null, null],
         [null, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
      assert.equal(obj.columnTotal, 4);
   });


   it('add new column between existing columns', () => {
      const obj = new InternalTableModel(2, 2);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null]
      ];
      assert.equal(obj.columnTotal, 3);
      obj.addColumnAt(1);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null, null],
         [null, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
      assert.equal(obj.columnTotal, 4);
   });


   it('add new last column', () => {
      const obj = new InternalTableModel(2, 2);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null]
      ];
      assert.equal(obj.columnTotal, 3);
      obj.addColumnAt(3);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null, null, null],
         [null, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
      assert.equal(obj.columnTotal, 4);
   });


   it('throws a range error for negative column index argument', () => {
      expect(() => new InternalTableModel(2, 2).addColumnAt(-1)).to.throw(RangeError, 'Index must not be negative');
   });

});



describe('InternalTableModel.removeRowAt()', () => {

   it('remove row between existing rows', () => {
      const obj = new InternalTableModel(4, 2);
      obj.table = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null],
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null]
      ];
      assert.equal(obj.rowTotal, 4);
      obj.removeRowAt(2);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null],
         [null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
      assert.equal(obj.rowTotal, 3);
   });


   it('remove last row with index matching array length', () => {
      const obj = new InternalTableModel(4, 2);
      obj.table = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null],
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null]
      ];
      assert.equal(obj.rowTotal, 4);
      obj.removeRowAt(3);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null],
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
      assert.equal(obj.rowTotal, 3);
   });


   it('remove last row with index exceeding array length', () => {
      const obj = new InternalTableModel(4, 2);
      obj.table = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null],
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null]
      ];
      assert.equal(obj.rowTotal, 4);
      obj.removeRowAt(2435);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null],
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
      assert.equal(obj.rowTotal, 3);
   });


   it('throws a range error for negative row index argument', () => {
      expect(() => new InternalTableModel(2, 2).removeRowAt(-1)).to.throw(RangeError, 'Index must not be negative');
   });


   it('throws a range error for trying to add new first line (reserved for title elements)', () => {
      expect(() => new InternalTableModel(2, 2).removeRowAt(0)).to.throw(RangeError, 'First row can not be removed due to it being reserved for title objects');
   });

});



describe('InternalTableModel.removeColumnAt()', () => {

   it('remove column between existing columns', () => {
      const obj = new InternalTableModel(2, 2);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null],
         [null, null, null]
      ];
      obj.removeColumnAt(1);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null],
         [null, null],
         [null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('remove last column with index matching array length', () => {
      const obj = new InternalTableModel(2, 2);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null],
         [null, null, null]
      ];
      obj.removeColumnAt(2);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
         ],
         [null, null],
         [null, null],
         [null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('remove last column with index exceeding array length', () => {
      const obj = new InternalTableModel(2, 2);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null],
         [null, null, null]
      ];
      obj.removeColumnAt(345);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
         ],
         [null, null],
         [null, null],
         [null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('throws a range error for negative row index argument', () => {
      expect(() => new InternalTableModel(2, 2).removeColumnAt(-1)).to.throw(RangeError, 'Index must not be negative');
   });

});



describe('InternalTableModel.swapRows()', () => {

   it('swaps rows for valid indices', () => {
      const obj = new InternalTableModel(4, 2);
      obj.table = [
         [
            { type: 'title', title: 'Row1', columnAlignment: 'left' },
            { type: 'title', title: 'Row2', columnAlignment: 'left' },
            { type: 'title', title: 'Row3', columnAlignment: 'left' },
         ],
         [
            { type: 'text', text: 'Content1.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content1.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content1.3', isLink: false, href: '', target: '', title: '' },
         ],
         [
            { type: 'text', text: 'Content2.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.3', isLink: false, href: '', target: '', title: '' },
         ]
      ];
      obj.swapRows(1, 2);
      const expectedResult : (TitleContent | TextContent)[][] = [
         [
            { type: 'title', title: 'Row1', columnAlignment: 'left' },
            { type: 'title', title: 'Row2', columnAlignment: 'left' },
            { type: 'title', title: 'Row3', columnAlignment: 'left' },
         ],
         [
            { type: 'text', text: 'Content2.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.3', isLink: false, href: '', target: '', title: '' },
         ],
         [
            { type: 'text', text: 'Content1.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content1.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content1.3', isLink: false, href: '', target: '', title: '' },
         ],
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('swaps rows for indices above maximum valid index', () => {
      const obj = new InternalTableModel(4, 2);
      obj.table = [
         [
            { type: 'title', title: 'Row1', columnAlignment: 'left' },
            { type: 'title', title: 'Row2', columnAlignment: 'left' },
            { type: 'title', title: 'Row3', columnAlignment: 'left' },
         ],
         [
            { type: 'text', text: 'Content1.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content1.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content1.3', isLink: false, href: '', target: '', title: '' },
         ],
         [
            { type: 'text', text: 'Content2.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.3', isLink: false, href: '', target: '', title: '' },
         ]
      ];
      obj.swapRows(1, 345);
      const expectedResult : (TitleContent | TextContent)[][] = [
         [
            { type: 'title', title: 'Row1', columnAlignment: 'left' },
            { type: 'title', title: 'Row2', columnAlignment: 'left' },
            { type: 'title', title: 'Row3', columnAlignment: 'left' },
         ],
         [
            { type: 'text', text: 'Content2.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.3', isLink: false, href: '', target: '', title: '' },
         ],
         [
            { type: 'text', text: 'Content1.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content1.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content1.3', isLink: false, href: '', target: '', title: '' },
         ],
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('throws a range error for negative row index argument', () => {
      expect(() => new InternalTableModel(2, 2).swapRows(0, 1)).to.throw(RangeError, 'First row can not be swapped due to it being reserved for title objects');
   });

});



describe('InternalTableModel.swapColumns()', () => {

   it('swaps columns for valid indices', () => {
      const obj = new InternalTableModel(1, 1);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null],
         [
            { type: 'text', text: 'Content2.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.3', isLink: false, href: '', target: '', title: '' },
         ],
         [null, null, null]
      ];
      obj.swapColumns(0, 2);
      const expectedResult: (TitleContent | TextContent | null)[][] = [
         [
            { type: 'title', title: 'Column3', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column1', columnAlignment: 'left' }
         ],
         [null, null, null],
         [
            { type: 'text', text: 'Content2.3', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.1', isLink: false, href: '', target: '', title: '' },
         ],
         [null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('swaps columns for indices above maximum valid index', () => {
      const obj = new InternalTableModel(1, 1);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null],
         [
            { type: 'text', text: 'Content2.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.3', isLink: false, href: '', target: '', title: '' },
         ],
         [null, null, null]
      ];
      obj.swapColumns(0, 6);
      const expectedResult1: (TitleContent | TextContent | null)[][] = [
         [
            { type: 'title', title: 'Column3', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column1', columnAlignment: 'left' }
         ],
         [null, null, null],
         [
            { type: 'text', text: 'Content2.3', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.1', isLink: false, href: '', target: '', title: '' },
         ],
         [null, null, null]
      ];

      assert.deepEqual(obj.getTableClone(), expectedResult1);
      obj.swapColumns(2134, 0);
      const expectedResult2: (TitleContent | TextContent | null)[][] = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null],
         [
            { type: 'text', text: 'Content2.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content2.3', isLink: false, href: '', target: '', title: '' },
         ],
         [null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult2);
   });


   it('throws a range error for negative column index arguments', () => {
      expect(() => new InternalTableModel(2, 2).swapColumns(0, -2)).to.throw(RangeError, 'Indices must not be negative');
   });

});



describe('InternalTableModel.getContentAt()', () => {

   it('get content for valid position', () => {
      const obj = new InternalTableModel(3, 3);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null],
         [null, null, { type: 'title', title: 'Column3', columnAlignment: 'left' }]
      ];
      let position = { rowIndex: 0, columnIndex: 0 };
      assert.deepEqual(obj.getContentAt(position), { type: 'title', title: 'Column1', columnAlignment: 'left' });

      position = { rowIndex: 3, columnIndex: 2 };
      assert.deepEqual(obj.getContentAt(position), { type: 'title', title: 'Column3', columnAlignment: 'left' });
   });


   it('throws a range error for invalid position', () => {
      let position = { rowIndex: -1, columnIndex: 0 };
      expect(() => new InternalTableModel(2, 2).getContentAt(position)).to.throw(RangeError, 'Position is not valid');
      position = { rowIndex: 5, columnIndex: 0 };
      expect(() => new InternalTableModel(2, 2).getContentAt(position)).to.throw(RangeError, 'Position is not valid');
   });

});



describe('InternalTableModel.setContentAt()', () => {

   it('add title content in first row', () => {
      const obj = new InternalTableModel(3, 3);
      const position = { rowIndex: 0, columnIndex: 1 };
      const titleContent: TitleContent = { type: 'title', title: 'Column2', columnAlignment: 'right' };
      obj.setContentAt(position, titleContent);
      const expectedResult: (TitleContent | null)[][] = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'right' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, null, null],
         [null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('add text content', () => {
      const obj = new InternalTableModel(3, 3);
      const position = { rowIndex: 1, columnIndex: 1 };
      const textContent: TextContent = { type: 'text', text: 'Content', isLink: false, href: '', target: '', title: '' };
      obj.setContentAt(position, textContent);

      const expectedResult: (TitleContent | TextContent | null)[][] = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, textContent, null],
         [null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('add image content', () => {
      const obj = new InternalTableModel(3, 3);
      const position = { rowIndex: 1, columnIndex: 1 };
      const imageContent: ImageContent = {
         type: 'image',
         src: 'src',
         alt: 'alt',
         width: 'width',
         height: 'height',
         title: '',
         isLink: false,
         href: '',
         target: ''
      };
      obj.setContentAt(position, imageContent);
      const expectedResult: (TitleContent | ImageContent | null)[][] = [
         [
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' },
            { type: 'title', title: '', columnAlignment: 'left' }
         ],
         [null, imageContent, null],
         [null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('throws an error for attempting to add title content in other row than first', () => {
      const obj = new InternalTableModel(3, 3);
      const position = { rowIndex: 1, columnIndex: 0 };
      const titleContent: TitleContent = { type: 'title', title: 'Column1', columnAlignment: 'left' };
      expect(() => obj.setContentAt(position, titleContent)).to.throw(Error, 'Title content objects are restricted to first row');
   });


   it('throws an error for attempting to add non title content to first row', () => {
      const obj = new InternalTableModel(3, 3);
      const position = { rowIndex: 0, columnIndex: 0 };
      const textContent: TextContent = { type: 'text', text: 'Content', isLink: false, href: '', target: '', title: '' };
      expect(() => obj.setContentAt(position, textContent)).to.throw(Error, 'Content of first row is reserved to title content objects');
   });


   it('throws a range error for attempting to add content at non valid position', () => {
      const obj = new InternalTableModel(3, 3);
      const position1 = { rowIndex: -1, columnIndex: 0 };
      const textContent: TextContent = { type: 'text', text: 'Content', isLink: false, href: '', target: '', title: '' };
      expect(() => obj.setContentAt(position1, textContent)).to.throw(RangeError, 'Position is not valid');

      const position2 = { rowIndex: 0, columnIndex: -1 };
      expect(() => obj.setContentAt(position2, textContent)).to.throw(RangeError, 'Position is not valid');
   });

});



describe('InternalTableModel.removeContentAt()', () => {

   it('removes content at valid position', () => {
      const obj = new InternalTableModel(3, 3);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' },
         ],
         [{ type: 'text', text: '(0, 1)', isLink: false, href: '', target: '', title: '' }, null, null],
         [null, { type: 'text', text: '(1, 2)', isLink: false, href: '', target: '', title: '' }, null],
         [null, null, { type: 'text', text: '(2, 3)', isLink: false, href: '', target: '', title: '' }]
      ];

      let position: TablePosition;
      let expectedResult: (TitleContent | TextContent | null)[][];

      position = { rowIndex: 1, columnIndex: 0 };
      expectedResult = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' },
         ],
         [null, null, null],
         [null, { type: 'text', text: '(1, 2)', isLink: false, href: '', target: '', title: '' }, null],
         [null, null, { type: 'text', text: '(2, 3)', isLink: false, href: '', target: '', title: '' }]
      ];
      obj.removeContentAt(position);
      assert.deepEqual(obj.getTableClone(), expectedResult);

      position = { rowIndex: 2, columnIndex: 1 };
      expectedResult = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' },
         ],
         [null, null, null],
         [null, null, null],
         [null, null, { type: 'text', text: '(2, 3)', isLink: false, href: '', target: '', title: '' }]
      ];
      obj.removeContentAt(position);
      assert.deepEqual(obj.getTableClone(), expectedResult);

      position = { rowIndex: 3, columnIndex: 2 };
      expectedResult = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' },
         ],
         [null, null, null],
         [null, null, null],
         [null, null, null]
      ];
      obj.removeContentAt(position);
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('throws an error for attempting to remove title content from first row', () => {
      const obj = new InternalTableModel(3, 3);
      const position: TablePosition = { rowIndex: 0, columnIndex: 1 };
      expect(() => obj.removeContentAt(position)).to.throw(Error, 'Title content must not be removed');
   });


   it('throws a range error for invalid position', () => {
      const obj = new InternalTableModel(3, 3);
      let position: TablePosition = { rowIndex: -1, columnIndex: 1 };
      expect(() => obj.removeContentAt(position)).to.throw(RangeError, 'Position is not valid');
      position = { rowIndex: 1, columnIndex: -1 };
      expect(() => obj.removeContentAt(position)).to.throw(RangeError, 'Position is not valid');
      position = { rowIndex: 5, columnIndex: 1 };
      expect(() => obj.removeContentAt(position)).to.throw(RangeError, 'Position is not valid');
      position = { rowIndex: 1, columnIndex: 5 };
      expect(() => obj.removeContentAt(position)).to.throw(RangeError, 'Position is not valid');
   });

});



describe('InternalTableModel.swapContent()', () => {

   it('swap title content', () => {
      const obj = new InternalTableModel(3, 3);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [
            { type: 'text', text: 'Column1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Column2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Column3', isLink: false, href: '', target: '', title: '' }
         ]
      ];
      const position1 = { rowIndex: 0, columnIndex: 0 };
      const position2 = { rowIndex: 0, columnIndex: 2 };
      obj.swapContent(position1, position2);

      const expectedResult: (TitleContent | TextContent | null)[][] = [
         [
            { type: 'title', title: 'Column3', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column1', columnAlignment: 'left' }
         ],
         [
            { type: 'text', text: 'Column1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Column2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Column3', isLink: false, href: '', target: '', title: '' }
         ]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('swap non title content', () => {
      const obj = new InternalTableModel(3, 3);
      obj.table = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [
            { type: 'text', text: 'Column1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Column2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Column3', isLink: false, href: '', target: '', title: '' }
         ]
      ];
      const position1 = { rowIndex: 1, columnIndex: 2 };
      const position2 = { rowIndex: 1, columnIndex: 1 };
      obj.swapContent(position1, position2);

      const expectedResult: (TitleContent | TextContent | null)[][] = [
         [
            { type: 'title', title: 'Column1', columnAlignment: 'left' },
            { type: 'title', title: 'Column2', columnAlignment: 'left' },
            { type: 'title', title: 'Column3', columnAlignment: 'left' }
         ],
         [
            { type: 'text', text: 'Column1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Column3', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Column2', isLink: false, href: '', target: '', title: '' }
         ]
      ];
      assert.deepEqual(obj.getTableClone(), expectedResult);
   });


   it('throws an error for attempting to swap title content with non title content', () => {
      const obj = new InternalTableModel(3, 3);
      const position1: TablePosition = { rowIndex: 0, columnIndex: 1 };
      const position2: TablePosition = { rowIndex: 1, columnIndex: 1 };
      expect(() => obj.swapContent(position1, position2)).to.throw(Error, 'Title content in first row can not be swapped with non title content');
   });


   it('throws a range error for invalid position', () => {
      const obj = new InternalTableModel(3, 3);
      let position1: TablePosition = { rowIndex: -1, columnIndex: 1 };
      const position2: TablePosition = { rowIndex: 0, columnIndex: 0 };

      expect(() => obj.swapContent(position1, position2)).to.throw(RangeError, 'Position is not valid');
      position1 = { rowIndex: 1, columnIndex: -1 };
      expect(() => obj.swapContent(position1, position2)).to.throw(RangeError, 'Position is not valid');
      position1 = { rowIndex: 5, columnIndex: 1 };
      expect(() => obj.swapContent(position1, position2)).to.throw(RangeError, 'Position is not valid');
      position1 = { rowIndex: 1, columnIndex: 5 };
      expect(() => obj.swapContent(position1, position2)).to.throw(RangeError, 'Position is not valid');
   });

});
