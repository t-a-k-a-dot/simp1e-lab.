---
title: 'VMware Remote Console から仮想マシンに接続できない問題のトラブルシューティング'
description: '自宅ラボで VMware Remote Console から仮想マシンに接続できない時に簡単なトラブルシューティングをした時のメモ。'
pubDate: 2025-07-06
tags: ['vSphere ESXi']
---
## はじめに
vSphere Client から VMware Remote Console を利用して仮想マシンに接続しようとしたが接続できなかった。  
非常に簡単なトラブルシューティングだったが備忘のため、記事に残しておく。

## この記事を読んで欲しい人
* 同じ問題が発生して困っている人


## 発生した問題
vSphere Client から仮想マシンを選択した状態で右クリックし、 [ Remote Console を開く ] から仮想マシンにリモート接続しようとした。  

![](/images/vmrc-troubleshooting-01/WS000075.webp)  

通常、この操作でリモート接続できるが以下の様に接続に失敗した。  
vSphere Client のログインに利用した User name 、 Password を入力しても接続できない。  

![](/images/vmrc-troubleshooting-01/WS000074.webp)

## 問題の原因
vSphere Client と VMware Remote Console を利用している PC で vCenter Server Appliance を正引き・逆引きの両方で名前解決できない状況となっていたことが原因。  
> [!NOTE]  
> VMware Remote Console から仮想マシンへの接続においても vCenter Server Appliance の名前解決を利用している。

## 対応
vSphere Client と VMware Remote Console を利用している PC で vCenter Server Appliance の正引き・逆引きの両方の名前解決が可能な DNS サーバーを利用するように設定することで解決。

## 環境
* vCenter Serer 8.0.3 Build\:24022515
* VMware Remote Console 12.0.5 Build\:22744838