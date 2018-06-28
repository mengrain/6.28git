<template>
	<div class="whole">
		<div class="Topnumber">
			<div class="Topnumber-left">
			<div class="TopYuan">5</div>
			    <p>楼宇</p>  
			</div>
			<div class="Topnumber-right">
			<div class="TopKuai">1024</div>
			    <p>房间</p>  
			</div>
		</div>
		<div class="butnumber">
			<div class="Topnumber-ul">
			<div class="Topnumber-ul-li">5</div>
			    <p>宿舍</p>  
			</div>
			<div class="Topnumber-ul">
			<div class="Topnumber-ul-li">5</div>
			    <p>卫生间</p>  
			</div>
			<div class="Topnumber-ul">
			<div class="Topnumber-ul-li">5</div>
			    <p>办公室</p>  
			</div>
			<div class="Topnumber-ul">
			<div class="Topnumber-ul-li">5</div>
			    <p>其他</p>  
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
.whole{
	width: 100%;
	height: 100%;
}
	.Topnumber{
		width: 100%;	
		overflow: hidden;
	}
	.Topnumber-left{
		width: 200px;
		height: 100%;
		float: left;
		margin: 20px 50px 0 100px;		
		text-align: center;
		line-height: 20px;
		font-size: 30px;
	}
	.TopYuan{
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background-color: #EBEBEB;
		color: #439AF3;
		line-height:120px;
		text-align: center;
		font-size: 30px;
		margin-left:40px;
	}
	.Topnumber-right{
		width: 300px;
		height: 100%;
		float: left;
		margin: 20px 50px 0 200px;		
		text-align: center;
		line-height: 20px;
		font-size: 30px;
	}
	.TopKuai{
			width: 300px;
			height: 120px;
			background-color: #EBEBEB;
			font-size: 30px;
			line-height: 120px;
			color: #439AF3;
		    text-align: center;
		}
		.butnumber{
			width: 100%;
			height: 250px;
		}
	  .Topnumber-ul{
		width: 200px;
		height: 100%;
		float: left;
		margin: 30px;		
		text-align: center;
		line-height: 20px;
		font-size: 20px;
	}
	.Topnumber-ul-li{
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background-color: #EBEBEB;
		color: #439AF3;
		line-height:100px;
		text-align: center;
		font-size: 30px;
		margin-left:50px;
	}
</style>