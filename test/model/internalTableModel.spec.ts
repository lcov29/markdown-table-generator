/* eslint-disable no-new */
import { assert, expect } from 'chai';
import { InternalTableModel } from '../../src/model/InternalTableModel';
import { TitleContent } from '../../src/model/types';


describe('InternalTableModel', () => {


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
