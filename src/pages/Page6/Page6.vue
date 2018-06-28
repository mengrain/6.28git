<template>
  <div className="page6-page">
        <TagMessageList />
        <BasicTable />
        <BarChart />
      </div>
</template>

<script>
import TagMessageList from './components/TagMessageList';
import BasicTable from './components/BasicTable';
import BarChart from './components/BarChart';

export default {
  name: 'Page6',
  components: {
    TagMessageList,
    BasicTable,
    BarChart,
  },
};
</script>
