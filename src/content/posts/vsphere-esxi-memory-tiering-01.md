---
title: 'vSphere 8.0 U3 でメモリ階層化 (Memory Tiering) を有効化'
description: 'vSphere 8.0 U3 でメモリ階層化 (Memory Tiering) を有効化した。'
pubDate: 2025-07-13
tags: ['vSphere ESXi']
---
## はじめに
自宅ラボのvSphere ESXi を導入している PC が搭載可能上限の 128GB までメモリを搭載しており、 メモリ階層化 (Memory Tiering) でなんとかもう少しメモリの利用上限を上げられないかと考え、設定をしたので備忘のため記事に残しておく。  
メモリ階層化 (Memory Tiering) は Tech Preview として 8.0 U3 で追加された機能であり、 DRAM メモリの代替として専用に用意した NVMe ストレージをメモリの延長として利用できる機能となる。  

## この記事を読んで欲しい人
* vSphere ESXi でメモリ階層化 (Memory Tiering) を利用したい人

## Memory Tiering 設定
1. Memory Tiering 設定前のメモリ容量を確認  
    vSphere Client にログインし、 [インベントリ] - [ホストおよびクラスタ] - [<ESXi ホスト>] - [構成] - [ハードウェア] - [概要] を選択し、メモリ容量を確認  
    ![](/images/vsphere-esxi-memory-tiering-01/WS000164.webp)
    <br>

1. Memory Tiering 用の NVMe ストレージの認識を確認  
    [インベントリ] - [ホストおよびクラスタ] - [<ESXi ホスト>] - [構成] - [ストレージ] - [ストレージ デバイス] を選択し、ストレージが認識していることを確認し、パスを控える
    ![](/images/vsphere-esxi-memory-tiering-01/WS000161.webp)

    [パーティションの詳細] を確認し、Memory Tiering 用に利用する NVMe デバイスにパーティションが作成されていないことを確認    
    ![](/images/vsphere-esxi-memory-tiering-01/WS000162.webp)   
    <br>

1. 対象の ESXi ホストを右クリックし、 [メンテナンス モード] - [メンテナンス モードへの切り替え] を選択し、メンテナンス モードに切り替え  
    <br>

1. ESXCLI にて事前に控えたパスを指定し、 NVMe デバイスで Tier Partition を作成  
    ```shell
    esxcli system tierdevice create -d /vmfs/devices/disks/t10.NVMe____CT500P310SSD8___________________________607BE84F0175A000
    ```
    <br>

1. Memory Tiering を有効化  
    ```shell
    esxcli system settings kernel set -s MemoryTiering -v TRUE
    ```
    <br>

1. Memory Tiering の割合を変更  
    デフォルト値は搭載されているメモリ容量の 25% を NVMe から利用できるようになっている  
    現実的な運用としては推奨されものではないですが、今回は最大値である 400% に変更する    
    ```shell
    esxcfg-advcfg -s 400 /Mem/TierNvmePct
    ```

    ```
    Value of TierNvmePct is 400
    ```
    <br>

1. 対象の ESXi ホストを再起動
    ```shell
    reboot
    ```
    <br>

1. Memory Tiering 設定後のメモリ容量を確認  
    vSphere Client にログインし、 [インベントリ] - [ホストおよびクラスタ] - [<ESXi ホスト>] - [構成] - [ハードウェア] - [概要] を選択し、メモリを確認  
    階層1 が追加されたことを確認  
    ![](/images/vsphere-esxi-memory-tiering-01/WS000168.webp)
    <br>

1. Memory Tiering 用の NVMe ストレージの認識を確認  
    [インベントリ] - [ホストおよびクラスタ] - [<ESXi ホスト>] - [構成] - [ストレージ] - [ストレージ デバイス] を選択し、指定した NVMe デバイスのデータストアが「メモリ階層化に使用」に変化していることを確認  
    ![](/images/vsphere-esxi-memory-tiering-01/WS000166.webp)
    <br>

1. 対象の ESXi ホストを右クリックし、 [メンテナンス モード] - [メンテナンス モードへの終了] を選択し、メンテナンス モードを終了
    <br>

## 環境
* vSphere ESXi 8.0.3 ( Build\:24674464 )
