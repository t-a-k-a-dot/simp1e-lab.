---
title: 'VyOS に open-vm-tools を導入'
description: 'VyOS に簡易に open-vm-tools を導入する。'
pubDate: 2025-06-28
tags: ['VyOS']
---
## はじめに
VyOS に open-vm-tools に導入する手順を備忘のため、残しておく。

## この記事を読んで欲しい人
* VyOS に open-vm-tools を導入しようと思っているが、導入手順が分からない人

## 前提条件
* VyOS の Interface に IP アドレスが設定され、 Internet に接続するための Routing が設定されている
* VyOS にて DNS サーバが設定され、名前解決できること

## 作業手順

1. VyOS に CLI または SSH 接続し、ログイン  
    <br>

1. Configuration Mode に変更
    ```console
    configure
    ```
    <br>

1. root にスイッチ
    ```console
    sudo su -
    ```
    <br>

1. APT ソース構成ファイルにリポジトリを追加
    ```console
    echo "deb http://deb.debian.org/debian bookworm main contrib non-free" > /etc/apt/sources.list.d/debian.list
    ```
    <br>

1. パッケージリストを更新
    ```console
    sudo apt update
    ```
    <br>

1. open-vm-tools インストール
    ```console
    sudo apt install open-vm-tools
    ```

    以下の確認メッセージが表示されるため、`Y`を応答  
    sudo apt install open-vm-tools  
    <br>

1. open-vm-tools サービスの自動起動を有効化
    ```console
    sudo systemctl enable open-vm-tools
    ```
    <br>

1. open-vm-tools サービスの起動
    ```console
    sudo systemctl start open-vm-tools
    ```
    <br>

1. open-vm-tools サービスのステータス確認
    ```console
    sudo systemctl status open-vm-tools
    ```
    open-vm-tools が enabled , active であることを確認  
    ___
    ● open-vm-tools.service - Service for virtual machines hosted on VMware  
     Loaded: loaded (/lib/systemd/system/open-vm-tools.service; <b><span style="color: red; ">enabled</span></b>; preset: enabled)  
     Active: <b><span style="color: red; ">active (running)</span></b> since Tue 2025-06-24 12:43:52 UTC; 26s ago  
       Docs: http://open-vm-tools.sourceforge.net/about.php  
   Main PID: 5131 (vmtoolsd)  
      Tasks: 3 (limit: 4674)  
     Memory: 2.1M  
        CPU: 233ms  
     CGroup: /system.slice/open-vm-tools.service  
             mq5131 /usr/bin/vmtoolsd  
    ___

## 環境
* VyOS 1.5-rolling-202501110007
* open-vm-tools 2\:12.2.0-1+deb12u2