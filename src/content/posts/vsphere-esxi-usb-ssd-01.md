---
title: 'vSphere 8.0 U3 で USB SSD をデータストアとして利用'
description: '利用せずに眠っていた USB SSD を vSphere 8.0 U3 に接続し、データストアとして利用した。'
pubDate: 2025-07-07
tags: ['vSphere ESXi']
---
## はじめに
以前購入してずっと利用してなかった USB SSD を自宅ラボで有効活用しようと思い、 vSphere ESXi のデータストアとして設定をしたため、備忘のため記事に残しておく。

## この記事を読んで欲しい人
* 過去に購入した USB SSD または USB HDD を vSphere ESXi で有効活用したいと考えている人

## USB SSD の準備
1. vSphere ESXi で利用するために USB SSD をフォーマット
    > [!NOTE]
    > NTFS のままでは vSphere ESXi は USB SSD を認識できないため、 FAT32 でフォーマットする必要がある。
    > Windows 11 の場合、 FAT32 にフォーマットできないため、 exFAT にフォーマットする。

    > [!CAUTION]
    > USB SSD をフォーマットすると USB SSD 内のデータが消去されるため、ご注意ください。

    ![](/images/vsphere-esxi-usb-ssd-01/WS000148.webp)
    <br>

## USB デバイスのパススルーを無効化
1. usbarbitrator のステータスを確認
    ```shell
    /etc/init.d/usbarbitrator status
    ```

    ```
    usbarbitrator is running
    ```
    <br>

1. usbarbitrator を停止
    ```shell
    /etc/init.d/usbarbitrator stop
    ```

    ```
    stopping usbarbitrator...  
    usbarbitrator stopped
    ```
    <br>

1. usbarbitrator の自動起動を無効化
    ```shell
    chkconfig usbarbitrator off
    ```
    <br>

## USB SSD 認識確認
1. USB SSD 接続前確認
    ```shell
    ls /dev/disks
    ```
    ```
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000      vml.0100000000334646305f304634355f303137355f4130303000435432303030        vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872  
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000:1    vml.0100000000334646305f304634355f303137355f4130303000435432303030:1      vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872:1  
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000:5    vml.0100000000334646305f304634355f303137355f4130303000435432303030:5      vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872:5  
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000:6    vml.0100000000334646305f304634355f303137355f4130303000435432303030:6      vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872:6  
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000:7    vml.0100000000334646305f304634355f303137355f4130303000435432303030:7      vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872:7  
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000:8    vml.0100000000334646305f304634355f303137355f4130303000435432303030:8      vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872:8  
    ```
    <br>

1. USB SSD を vSphere ESXi が動作する筐体に接続する
    <br>

1. USB SSD 接続前確認
    > [!NOTE]
    > 以下が新たに認識していることを確認
    > * <b><span style="color: red; ">mpx.vmhba34:C0:T0:L0</span></b>
    > * <b><span style="color: blue; ">mpx.vmhba34:C0:T0:L0\:1</span></b>
    ```
    mpx.vmhba34:C0:T0:L0                                                      vml.0000000000766d68626133343a303a30                                      vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872  
    mpx.vmhba34:C0:T0:L0:1                                                    vml.0000000000766d68626133343a303a30:1                                    vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872:1  
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000      vml.0100000000334646305f304634355f303137355f4130303000435432303030        vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872:5  
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000:1    vml.0100000000334646305f304634355f303137355f4130303000435432303030:1      vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872:6  
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000:5    vml.0100000000334646305f304634355f303137355f4130303000435432303030:5      vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872:7  
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000:6    vml.0100000000334646305f304634355f303137355f4130303000435432303030:6      vml.05d3d6763610bd135fd783f7c5c15b5b188c7d2be5880622d17219c3cfaaaac872:8  
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000:7    vml.0100000000334646305f304634355f303137355f4130303000435432303030:7  
    t10.NVMe____CT2000T500SSD5__________________________3FF00F450175A000:8    vml.0100000000334646305f304634355f303137355f4130303000435432303030:8  
    ```
     ![](/images/vsphere-esxi-usb-ssd-01/WS000267.webp)
   <br>

## パーティション作成
1. GPT ラベルを作成  
    事前に認識確認した /dev/disks/<b><span style="color: red; ">mpx.vmhba34:C0:T0:L0</span></b> を指定
    ```shell
    partedUtil mklabel /dev/disks/mpx.vmhba34:C0:T0:L0 gpt
    ```
    <br>

1. USB SSD のパーティションテーブルを確認  
    事前に認識確認した /dev/disks/<b><span style="color: red; ">mpx.vmhba34:C0:T0:L0</span></b> を指定
    ```shell
    partedUtil getptbl /dev/disks/mpx.vmhba34:C0:T0:L0
    ```

    ```
    gpt  
    58369 255 63 937703088
    ```
    <br>

1. パーティションテーブル作成にて終了セクタに指定する値を算出  
    事前に認識確認した /dev/disks/<b><span style="color: red; ">mpx.vmhba34:C0:T0:L0</span></b> を指定
    ```
    eval expr $(partedUtil getptbl /dev/disks/mpx.vmhba34:C0:T0:L0 | tail -1 | awk '{print $1 " \\* " $2 " \\* " $3 " - 1"}')
    ```

    ```
    937697984
    ```
    <br>

1. GPT パーティションテーブルを作成
    | 指定値 | 値の内容 |
    | ---| --- |
    | 1 | パーティションナンバー |
    | 2048 | 開始セクタ |
    | 937697984 | 終了セクタ |
    | AA31E02A400F11DB9590000C2911D1B8 | VMFS データストア GUID |
    | 0 | パーティション属性値 |

    事前に認識確認した /dev/disks/<b><span style="color: red; ">mpx.vmhba34:C0:T0:L0</span></b> を指定  
    終了セクタは項番3 (1つ前) の手順で算出した値を指定  

    ```shell
    partedUtil setptbl /dev/disks/mpx.vmhba34:C0:T0:L0 gpt "1 2048 937697984 AA31E02A400F11DB9590000C2911D1B8 0"
    ```
    ```
    gpt  
    0 0 0 0  
    1 2048 937697984 AA31E02A400F11DB9590000C2911D1B8 0
    ```
    <br>

1. VMFS6 にてパーティションを作成  
    ファイルシステム名として「USB-SSD-Buffalo」を指定  
    USB SSD 認識確認にて確認した /dev/disks/<b><span style="color: blue; ">mpx.vmhba34:C0:T0:L0\:1</span></b> を指定  

    ```shell
    vmkfstools -C vmfs6 -S USB-SSD-Buffalo /dev/disks/mpx.vmhba34:C0:T0:L0:1
    ```
    ```
    create fs deviceName:'/dev/disks/mpx.vmhba34:C0:T0:L0:1', fsShortName:'vmfs6', fsName:'USB-SSD-Buffalo'  
    deviceFullPath:/dev/disks/mpx.vmhba34:C0:T0:L0:1 deviceFile:mpx.vmhba34:C0:T0:L0:1  
    ATS on device /dev/disks/mpx.vmhba34:C0:T0:L0:1: not supported  
    .  
    Checking if remote hosts are using this device as a valid file system. This may take a few seconds...  
    Scanning for VMFS-6 host activity (4096 bytes/HB, 1024 HBs).  
    Creating vmfs6 file system on "mpx.vmhba34:C0:T0:L0:1" with blockSize 1048576, unmapGranularity 1048576, unmapPriority default and volume label "USB-SSD-Buffalo".  
    Successfully created new volume: 6868923c-fec3e57e-e7c7-b4969130419a
    ```
    <br>

1. データストア確認  
    USB-SSD-Buffalo がデータストアとして構成されていることを確認
    ![](/images/vsphere-esxi-usb-ssd-01/WS000268.webp)

## 環境
* vSphere ESXi 8.0.3 ( Build\:24674464 )
<br>

## 今回の対応で参考にしたサイト
> * [ESXi で partedUtil コマンドライン ユーティリティを使用する](https://knowledge.broadcom.com/external/article/341076/esxi-partedutil.html)