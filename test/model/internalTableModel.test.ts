/* eslint-disable no-new */
import { assert, expect } from 'chai';
import { InternalTableModel } from '../../src/model/InternalTableModel';
import { TitleContent } from '../../src/model/types';


describe('InternalTableModel constructor', () => {

   it('instantiates an empty table of specified size for valid size arguments', () => {
      const rowTotal = 4;
      const columnTotal = 3;
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null]
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



describe('InternalTableMode.table', () => {

   it('sets table attribute to user input', () => {
      const obj = new InternalTableModel(2, 2);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: 'Column1', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column2', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column3', columnAlignment: 'left' }, null, null, null]
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
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.rowTotal, 4);
   });


   it('add new row at end of existing rows with index matching array length', () => {
      const obj = new InternalTableModel(4, 3);
      assert.equal(obj.rowTotal, 4);
      obj.addRowAt(3);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.rowTotal, 5);
   });


   it('add new row at end of existing rows with index exceeding array length', () => {
      const obj = new InternalTableModel(4, 3);
      assert.equal(obj.rowTotal, 4);
      obj.addRowAt(102);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
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
      const obj = new InternalTableModel(3, 2);
      assert.equal(obj.columnTotal, 2);
      obj.addColumnAt(0);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.columnTotal, 3);
   });


   it('add new column between existing columns', () => {
      const obj = new InternalTableModel(3, 4);
      assert.equal(obj.columnTotal, 4);
      obj.addColumnAt(2);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.columnTotal, 5);
   });


   it('add new last column', () => {
      const obj = new InternalTableModel(3, 3);
      assert.equal(obj.columnTotal, 3);
      obj.addColumnAt(3);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.columnTotal, 4);
   });


   it('throws a range error for negative column index argument', () => {
      expect(() => new InternalTableModel(2, 2).addColumnAt(-1)).to.throw(RangeError, 'Index must not be negative');
   });

});



describe('InternalTableModel.removeRowAt()', () => {

   it('remove row between existing rows', () => {
      const obj = new InternalTableModel(4, 2);
      assert.equal(obj.rowTotal, 4);
      obj.removeRowAt(1);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.rowTotal, 3);
   });


   it('remove last row with index matching array length', () => {
      const obj = new InternalTableModel(4, 2);
      assert.equal(obj.rowTotal, 4);
      obj.removeRowAt(3);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.rowTotal, 3);
   });


   it('remove last row with index exceeding array length', () => {
      const obj = new InternalTableModel(4, 2);
      assert.equal(obj.rowTotal, 4);
      obj.removeRowAt(345);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
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
      const obj = new InternalTableModel(4, 3);
      assert.equal(obj.columnTotal, 3);
      obj.removeColumnAt(1);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.columnTotal, 2);
   });


   it('remove last column with index matching array length', () => {
      const obj = new InternalTableModel(4, 3);
      assert.equal(obj.columnTotal, 3);
      obj.removeColumnAt(2);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.columnTotal, 2);
   });


   it('remove last column with index exceeding array length', () => {
      const obj = new InternalTableModel(4, 3);
      assert.equal(obj.columnTotal, 3);
      obj.removeColumnAt(345);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.columnTotal, 2);
   });


   it('throws a range error for negative row index argument', () => {
      expect(() => new InternalTableModel(2, 2).removeColumnAt(-1)).to.throw(RangeError, 'Index must not be negative');
   });

});



describe('InternalTableModel.swapRows()', () => {

   it('swaps rows', () => {
      const obj = new InternalTableModel(4, 2);
      assert.equal(obj.rowTotal, 4);
      obj.swapRows(1, 2);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
      assert.equal(obj.rowTotal, 4);
   });


   it('throws a range error for negative row index argument', () => {
      expect(() => new InternalTableModel(2, 2).swapRows(0, 1)).to.throw(RangeError, 'First row can not be swapped due to it being reserved for title objects');
   });

});



describe('InternalTableModel.swapColumns()', () => {

   it('swaps columns for valid indices', () => {
      const obj = new InternalTableModel(1, 1);
      obj.table = [
         [{ type: 'title', title: 'Column1', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column2', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column3', columnAlignment: 'left' }, null, null, null]
      ];
      obj.swapColumns(0, 2);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: 'Column3', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column2', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column1', columnAlignment: 'left' }, null, null, null]

      ];
      assert.deepEqual(obj.getTableClone(), table);
   });


   it('swaps columns for indices above maximum valid index', () => {
      const obj = new InternalTableModel(1, 1);
      obj.table = [
         [{ type: 'title', title: 'Column1', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column2', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column3', columnAlignment: 'left' }, null, null, null]
      ];
      obj.swapColumns(0, 6);
      const table1: (TitleContent | null)[][] = [
         [{ type: 'title', title: 'Column3', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column2', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column1', columnAlignment: 'left' }, null, null, null]

      ];
      assert.deepEqual(obj.getTableClone(), table1);
      obj.swapColumns(2134, 0);
      const table2: (TitleContent | null)[][] = [
         [{ type: 'title', title: 'Column1', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column2', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: 'Column3', columnAlignment: 'left' }, null, null, null]

      ];
      assert.deepEqual(obj.getTableClone(), table2);
   });


   it('throws a range error for negative column index arguments', () => {
      expect(() => new InternalTableModel(2, 2).swapColumns(0, -2)).to.throw(RangeError, 'Indices must not be negative');
   });

});
