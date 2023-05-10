<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div style="width: 100%; display: inline-block">
          <el-statistic title="电机输出">
            <template slot="formatter"> {{ motorOutput }} w</template>
          </el-statistic>
        </div>
        <div style="width: 100%; display: inline-block">
          <el-statistic title="舱内温度">
            <template slot="formatter"> {{ cabinTemperature }} ℃</template>
          </el-statistic>
        </div>
        <div style="width: 100%; display: inline-block">
          <el-statistic title="下潜深度">
            <template slot="formatter"> {{ divingDepth }} m</template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="10">
        <div style="width: 100%; display: inline-block">
          <el-statistic title="剩余电量">
            <template slot="formatter"> {{ remainingBattery }} v</template>
          </el-statistic>
        </div>
        <div style="width: 100%; display: inline-block">
          <el-statistic title="水体温度">
            <template slot="formatter"> {{ waterTemperature }} ℃</template>
          </el-statistic>
        </div>
        <div style="width: 100%; display: inline-block">
          <el-statistic title="下潜时长">
            <template slot="formatter"> {{ divingDuration }} </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "MyPanel",
  data() {
    return {
      motorOutput: 2000,
      remainingBattery: 220,
      cabinTemperature: 40,
      waterTemperature: 5,
      divingDepth: 456,
      divingDuration: "05:12:34",
    };
  },
};
</script>
<style>
</style>
