<template>
	<div class="layer">
		<div class="title">一层  <i class="el-icon-error"></i></div>
		<div class="content">
			<ul>
				<li>101</li>
				<li>101</li>
				<li>101</li>
				<li>101</li>
				<li>101</li>
				<li>101</li>
				<li>101</li>
				<li>101</li>
				<li>101</li>
				<li>101</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	
</script>

<style lang="scss" scoped>
	.layer{
		width: 95%;
		height: 500px;
		float: left;
		margin-left: 2.5%;
		margin-top: 10px;
		border: 1px solid #ccc;
		margin-top: 10px;
	}
	.title{
		width: 80px;
		background-color: #EDF6FF;
		text-align: center;
		line-height: 40px;
		color: #46A0FC;
		margin-top: 10px;
	}
	.content{
		width: 100%;
		overflow: hidden;
		ul{
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			li{
				height: 80px;
				border: 1px solid #ccc;
				float: left;
				text-align: center;
				line-height: 80px;
				list-style: none;
				flex-wrap: nowrap;
				flex-basis:18%;
				box-sizing: border-box;
				margin-top: 80px;
			}
		}
	}
	
</style>