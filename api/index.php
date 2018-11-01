<?php
/**
 * API
 */
error_reporting(E_ALL ^ E_DEPRECATED);
header('Content-type:text/html;charset=utf-8');
require('config.inc.php');
$method = strtolower(trim($_GET['method']));
//file_put_contents('ttt.txt',$_SERVER['HTTP_REFERER']."\n",FILE_APPEND );


if (function_exists($method) === true) {
    $method();
} else {
    tojson(array('result' => 0, 'msg' => '接口错误'));
}


function jssdk() {
	$_options['appid']	   = $GLOBALS['appid'];
	$_options['appsecret'] = $GLOBALS['appsecret'];

	//var_dump($_options);
}

function outh() {
	$redirect = $GLOBALS['redirect'];
	$gameUrl  = $GLOBALS['actUrl'];
	require('Wechat.class.php');
	$_options['appid']	   = $GLOBALS['appid'];
	$_options['appsecret'] = $GLOBALS['appsecret'];
	$_wechat = new Wechat($_options);
	//var_dump($_options);die;
	if(!isset($_GET['code'])){
		$authUrl =  $_wechat->getOauthRedirect($redirect,1,'snsapi_userinfo');
		header("location:".$authUrl);
		exit();
	}

	if(isset($_GET['code']) && 1 == $_GET['state']){
		$json = $_wechat->getOauthAccessToken();  //获取oauth2_access_token

        //var_dump($json);

        //var_dump($_wechat->errCode);
        //var_dump($_wechat->errMsg);

		$openid = $json['openid'];
		$user = $_wechat->getOauthUserinfo($json['access_token'],$json['openid']);
	}

	if($user) {
		$openid = $user['openid'];
		//$userinfo['openid'] = $openid;
		$userinfo['nick_name'] = $user['nickname'];
		$userinfo['head_img'] = $user['headimgurl'];
		//var_dump($userinfo);die;
		setcookie('face_user',json_encode($userinfo),0,'/','youdao.com');

		header("location:".$gameUrl);
		exit();
	} else {
		tojson(array('result' => 0, 'msg' => '接口错误！'));
	}
}


function face() {
	$img_data     = trim($_POST['img_data']);		// base64资源文件
	$modelId_data = trim($_POST['model_id']);		// 
	if(!$img_data && !$modelId_data) {
		tojson(array('result' => 0, 'msg' => '参数错误'));
	}
	/** 签名开始 **/
	$appid = "1257372827";
	$bucket = "";
	$secret_id = "AKIDsfHk28cC5nLhvyRhHguxpV0PfkgQGNac";
	$secret_key = "89zfS5XnbGE9sRpGZkkYBcu11sY2OZYM";
	$expired = time() + 2592000;
	$onceExpired = 0;
	$current = time();
	$rdm = rand();
	$userid = "0";
	$fileid = "";
	$srcStr       = 'a='.$appid.'&b='.$bucket.'&k='.$secret_id.'&e='.$expired.'&t='.$current.'&r='.$rdm.'&u='.$userid.'&f=';
	$signStr      = base64_encode(hash_hmac('SHA1', $srcStr, $secret_key, true).$srcStr);
	/** 签名结束 **/
	
	//在头部设置鉴权信息
	$headers = array('Authorization: '.$signStr);

	//封装数据为json格式
	$post_data = array(
				 "rsp_img_type" => "url",
				 "project_id"   => "100501",
				 "appid"        => $appid,
				 "uin"          => "100007056276",
				 "img_data"     => $img_data,
				 "model_id"     => $modelId_data,			
			 );
	$post_data =json_encode($post_data);

	$result = http_post($headers,$post_data);
	if($result) {
		$result = json_decode($result,TRUE);
		if($result['ret'] === "0") {
			tojson(array('result' => 1, 'msg' => 'OK','img_url'=>$result['img_url']));
		} else {
			tojson(array('result' => -1, 'err_code'=>$result['ret'],'msg' => $result['msg']));
		}
		
	} else {
		tojson(array('result' => 0, 'msg' => '合成失败'));
	}
}


function model_ids() {
	$ids = array(
		'qc_100501_182722_15',
		'qc_100501_182619_14',
		'qc_100501_112343_4',
		'qc_100501_182402_10',
		'qc_100501_182350_8',
		'qc_100501_182344_7'
	);
	return $ids[array_rand($ids,1)];
	
}

function http_post($headers,$post_data) {
	if(!$headers || !$post_data) {
		return false;
	}
	//curl库访问服务
	$url  = "http://aiconsole.cloud.tencent.com/fuseapi/face";
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);


	if (stripos ( $url, "https://" ) !== FALSE) {
		curl_setopt ( $curl, CURLOPT_SSL_VERIFYPEER, FALSE );
		curl_setopt ( $curl, CURLOPT_SSL_VERIFYHOST, FALSE );
		curl_setopt ( $curl, CURLOPT_SSLVERSION, 1 ); // CURL_SSLVERSION_TLSv1
	}

	curl_setopt($curl, CURLOPT_HEADER, 1);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt ($curl, CURLOPT_CONNECTTIMEOUT, 10 );
    curl_setopt ($curl, CURLOPT_TIMEOUT, 20 );
	//curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);

	curl_setopt($curl, CURLOPT_HEADER, false);    //表示需要response header
    //curl_setopt($curl, CURLOPT_NOBODY, FALSE);   //表示需要response body

	$sContent = curl_exec ( $curl );
	$aStatus = curl_getinfo ( $curl );
	curl_close ( $curl );
	if (intval ( $aStatus ["http_code"] ) == 200) {
		return $sContent;
	} else {
		return false;
	}
}

function tojson($data){
	echo json_encode($data);
    exit();
}