<?php
/**
 * 微信 JSSDK 
 */
class Jssdk {
    private $appId;
    private $appSecret;
    private $mc;   
	private $mc_key;
	private $mc_ticketKey;
    public function __construct($appId, $appSecret) {
        $this->appId = trim($appId);
        $this->appSecret = trim($appSecret);
		$this->mc_key=$this->appSecret;				// accesstoken
		$this->mc_ticketKey="ticke-".$this->appSecret;  // ticket
        $this->mc = new Memcache;
        $r = $this->mc->connect('localhost',12121);
		if(!$r) {
			//echo "Memcache 连接失败！";
			return false;
		}
		if(!$this->appId && $this->appId==""){
			//echo "appid丢失！";
			return false;
		}
		if(!$this->appSecret && $this->appSecret==""){
			//echo "appsecret丢失！";
			return false;
		}
    }

    public function getSignPackage() {
        $jsapiTicket = $this->getJsApiTicket();
		$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";

        $url = $protocol."$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $timestamp = time();
        $nonceStr = $this->createNonceStr();

        // 这里参数的顺序要按照 key 值 ASCII 码升序排序
        $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

        $signature = sha1($string);

        $signPackage = array(
            "appId"     => $this->appId,
            "nonceStr"  => $nonceStr,
            "timestamp" => $timestamp,
            "url"       => $url,
            "signature" => $signature,
            "rawString" => $string
        );
        return $signPackage;
    }

    private function createNonceStr($length = 16) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        }
        return $str;
    }

    private function getJsApiTicket() {
        $accessToken = $this->getAccessToken();
        $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
		$key  = $this->mc_ticketKey;
        $ticket = $this->mc->get($key);
        if(!$ticket){
			$result = $this->httpGet($url);
			if ($result) {
				$json = json_decode($result,true);
				if (!$json || !empty($json['errcode'])) {
					return false;
				}
				$ticket = $json['ticket']; 
				$this->mc->set($this->mc_ticketKey,$ticket,0,7000);
			}else{
				return false;			
			}
        }
        return $ticket;
    }

    public function getAccessToken() {
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
		$key  = $this->mc_key;
        $access_token = $this->mc->get($key);
        if(!$access_token){
            $result = $this->httpGet($url);
			if ($result) {
				$json = json_decode($result,true);
				if (!$json || isset($json['errcode'])) {
					return false;
				}
				
				$accessToken =  $json['access_token'];
				$this->mc->set($key,$accessToken ,0,7000);
				return $accessToken;
			}
			return false;
        } else {
			return $access_token;
		}    
    }

    private function httpGet($url) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
        curl_setopt($curl, CURLOPT_URL, $url);

        $res = curl_exec($curl);
        curl_close($curl);

        return $res;
    }
}
