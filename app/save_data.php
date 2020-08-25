<?php
include './vendor/autoload.php';

if($_REQUEST['ip'] && ($_REQUEST['latitude'] || $_REQUEST['longitude'] || $_REQUEST['country_code']) ) {
    $_REQUEST['reg_time'] = time();
    $dir = __dir__.'/../data/';
    $path = strpos($_REQUEST['ip'], '.')===false ? (strpos($_REQUEST['ip'], ':')===false ? '' : explode(':', $_REQUEST['ip']) ) : explode('.', $_REQUEST['ip']);
    if($path && count($path)>2) {
        $repo = new Cz\Git\GitRepository($dir);
        $repo->pull('origin'); // 동기화. 단독서버라면 불필요함.
        $dir .= implode('/',$path);
        if(!file_exists($dir)) mkdir($dir, 0777, true);
        $file = $dir.'/'.sha1($_REQUEST['ip']).'.json';
        $data = file_exists($file) ? json_decode(file_get_contents($file)) : array();
        array_splice($data, 99);
        $data = array_reverse($data);
        $data[] = $_REQUEST;
        $data = array_reverse($data);
        file_put_contents($file, json_encode($data));
        $repo->addFile($file); // success
        $repo->commit('added '.$_REQUEST['ip']); // <-- Fatal error ... 윈도우라 그런가?? Linux에서 함 해봅시다.
        /*
        Fatal error: Uncaught Cz\Git\GitException: Command 'git commit -m "added 1.238.214.190"' failed (exit-code 128). in C:\AppServ\www\freeipinfo.github.io\app\vendor\czproject\git-php\src\GitRepository.php:664 Stack trace: #0 C:\AppServ\www\freeipinfo.github.io\app\vendor\czproject\git-php\src\GitRepository.php(372): Cz\Git\GitRepository->run('git commit -m "...', Array, Array) #1 C:\AppServ\www\freeipinfo.github.io\app\save_data.php(21): Cz\Git\GitRepository->commit('added 1.238.214...') #2 {main} thrown in C:\AppServ\www\freeipinfo.github.io\app\vendor\czproject\git-php\src\GitRepository.php on line 664
        */
        $repo->push('origin');
    }
}