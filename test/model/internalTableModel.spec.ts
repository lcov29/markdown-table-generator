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



describe('InternalTableModel.addRowAt()', () => {

   it('add new row between existing rows', () => {
      const obj = new InternalTableModel(3, 2);
      obj.addRowAt(1);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
   });


   it('add new row at end of existing rows with index matching array length', () => {
      const obj = new InternalTableModel(4, 3);
      obj.addRowAt(3);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
   });


   it('add new row at end of existing rows with index exceeding array length', () => {
      const obj = new InternalTableModel(4, 3);
      obj.addRowAt(102);
      const table: (TitleContent | null)[][] = [
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null],
         [{ type: 'title', title: '', columnAlignment: 'left' }, null, null, null, null]
      ];
      assert.deepEqual(obj.getTableClone(), table);
   });


   it('throws a range error for negative row index argument', () => {
      expect(() => new InternalTableModel(2, 2).addRowAt(-1)).to.throw(RangeError, 'Index must not be negative');
   });


   it('throws a range error for trying to add new first line (reserved for title elements)', () => {
      expect(() => new InternalTableModel(2, 2).addRowAt(0)).to.throw(RangeError, 'Can not add new first row due to it being reserved for title objects');
   });

});
