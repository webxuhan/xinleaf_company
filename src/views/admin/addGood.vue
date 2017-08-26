<template>
	<div>
		<head-top></head-top>
		<el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      >
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      width="100"
      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template scope="scope">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          close-transition>{{scope.row}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
	</div>
</template>
<script>
	import headTop from '../../components/headTop';
	export default {
		components:{
			headTop
		},
		  data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王1',
          address: '这是王1家',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王2',
          address: '这是王2公司',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王3',
          address: '这是王3家',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王4',
          address: '这是王4公司',
          tag: '公司'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
      	console.log('row:',row);
      	console.log('val:',value);
      	console.log(row.tag === value)
        return row.tag === value;
      }
    }
	}
</script>