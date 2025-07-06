---
title: 'Intel 14th CPU (Raptor Lake-S Refresh) を搭載する PC に vSphere ESXi 8.0U3 をインストール'
description: '自宅ラボの Intel 14th CPU (Raptor Lake-S Refresh) を搭載する PC に vSphere ESXi 8.0U3 をインストールする。'
pubDate: 2025-07-05
tags: ['vSphere ESXi']
---
## はじめに
今回、個人の勉強用にコンシューマー向けの Intel CPU を利用した自宅ラボを構築したのですが、 vSphere ESXi インストール時に PSOD (Purple Screen Of Death) が発生し、非常に手こずった。  
自身の備忘と今後、同じ様に vSphere ESXi を利用した自宅ラボ環境を構築しようとしている人のために記事に残しておく。

## この記事を読んで欲しい人
* Intel 12th 以降の コンシューマー向けの CPU を利用した PC に vSphere ESXi を導入しようと考えている人

## PSOD が発生する理由
コンシューマー向けの Intel 12th 以降の CPU では P コア、 E コアの二種類のコアが搭載された。  
P コア、 E コアの大まかな違いについては以下の通り。

| Core | P コア (Performance Core) | E コア (Efficient Core) |
| --- | --- | --- | 
| 特徴 | 性能重視 | 電力効率重視 |
| 最適化 | シングルスレッドや並列度の低いタスク | 並列度の高いワークロード |
| Hyper-Threading | 対応 | 非対応 |

vSphere ESXi はコンシューマーアーキテクチャを認識しておらず、 CPU コアが均一であることを前提としている。  
素直に vSphere ESXi をインストールしようとすると CPU プロパティが異なることが原因で CPU 均一性のチェックにおいて PSOD が発生する。

## PSOD を回避する方法
以下の設定を行うことで PSOD を回避する。  
* CPU 均一性チェックを無効化
* MSR 障害を無視

> **MSR (Model-Specific Registers) とは**  
> プロセッサ実装によって提供される制御レジスタであり、システムソフトウェアがパフォーマンスの監視、プロセッサステータスの確認、デバッグ、プログラムのトレース、特定の CPU 機能の切り替え等、様々な機能と対話できるようにする。

## vSphere ESXi インストール手順
1. PC に vSphere ESXi のインストールメディアを挿入し、起動する

1. 以下の画面で<b><span style="color: red; ">5秒以内</span></b>に [Shift] + [O] を押下し、 Edit boot options に遷移する  
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000020.webp)

1. …cdromBoot の後に以下の文字列を入力し、 [Enter] を押下する
    ```shell
    cpuUniformityHardCheckPanic=FALSE
    ```
    ※画面イメージは以下の通り
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000021.webp)

1. 以下の画面で [Enter] を押下し、インストールを開始する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000024.webp)

1. 以下の画面で [F11] を押下し、 EULA に同意する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000025.webp)

1. 以下の画面でインストール先とするディスクを選択した状態で [Enter] を押下する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000027.webp)

1. キーボードレイアウトに [ Japanese ] を選択した状態で [Enter] を押下する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000028.webp)

1. 設定したい root パスワードを2度入力し、 [Enter] を押下する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000029.webp)

1. [F11] を押下し、インストールを続行する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000030.webp)

1. 以下の画面で [Alt] + [F1] を押下し、 シェルコンソール に遷移する  
    <span style="color: red; ">※[Enter] を押下しない様に注意</span>
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000032.webp)

1. ESXi Shell で root ユーザーとしてログインする  
    ID：root  
    PW：(Blank)  
    <span style="color: red; ">※パスワードは設定したものではなく、(Blank)</span>
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000035.webp)

1. 以下のコマンドを入力し、 [Enter] を押下する
    ```shell
    vi /vmfs/volumes/BOOTBANK1/boot.cfg
    ```
    ※vi 操作で **boot.cfg** を変更する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000037.webp)

1. 6行目の autoPartition=FALSE の後に以下を入力する
    ```shell
    cpuUniformityHardCheckPanic=FALSE
    ```
    `:wq` を入力後、 [Enter] を押下し、変更を上書き保存する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000037.webp)

1. `exit` を入力後、 [Enter] を押下し、ログアウトする

1. 以下の画面で [Alt] + [F2] を押下し、 DCUI に遷移する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000044.webp)

1. 以下の画面で [Enter] を押下し、再起動する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000045.webp)

## 恒久設定手順
1. DCUI で [F2] を押下する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000047.webp)

1. 以下の画面で root のログイン情報を入力し、 [Enter] を押下する  
    ID：root  
    PW：<root_password>　※インストール時に指定したパスワード
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000048.webp)

1. [ Troubleshooting Options ] を選択し、 [Enter] を押下する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000049.webp)

1. [ Enable ESXi Shell ] を選択し、 [Enter] を押下し、"ESXi Shell is Enabled"に変化したことを確認する  
    [Alt] + [F1] を押下し、シェルコンソール に遷移する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000050.webp)

1. ESXi Shell で root ユーザーとしてログインする  
    ID：root  
    PW：<root_password>　※インストール時に指定したパスワード
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000053.webp)

1. 以下のコマンドを順番に実行する
    
    CPU 均一性チェック設定確認 (Configured が TRUE であることを確認)
    ```shell
    esxcli system settings kernel list -o cpuUniformityHardCheckPanic
    ``` 
    CPU 均一性チェック設定 (Configured を FALSE に変更)
    ```shell
    esxcli system settings kernel set -s cpuUniformityHardCheckPanic -v FALSE
    ```
    CPU 均一性チェック設定確認 (Configured が TRUE であることを確認)
    ```shell
    esxcli system settings kernel list -o cpuUniformityHardCheckPanic
    ```
    MSR 障害無視設定確認 (Configured が FALSE であることを確認)
    ```shell
    esxcli system settings kernel list -o ignoreMsrFaults
    ```
    MSR 障害無視設定 (Configured を TRUE に変更)
    ```shell
    esxcli system settings kernel set -s ignoreMsrFaults -v TRUE
    ```
    MSR 障害無視設定確認 (Configured が TRUE であることを確認)
    ```shell
    esxcli system settings kernel list -o ignoreMsrFaults
    ```
    ※以下の画面の通り順番にコマンドを実行する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000065.webp)

1. `exit` コマンドを実行し、ログアウトする
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000066.webp)

1. 以下の画面で [Alt] + [F2] を押下し、 DCUI に遷移する
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000044.webp)

1. [ Disable ESXi Shell ] を選択し、 [Enter] を押下し、"ESXi Shell is Disabled"に変化したことを確認する  
    ![](/images/intel-14th-cpu-vsphere-esxi-803-install-01/ws000069.webp)

1. [ESC] を2度押下し、DCUI からログアウトする  
    手順は以上で終了

## 環境
* vCenter Serer 8.0.3 ( Build\:24022515 )
* vSphere ESXi 8.0.3 ( Build\:24022510 )

## 今回の対応で参考にしたサイト
> * [Video of ESXi install workaround for Fatal CPU mismatch on feature for Intel 12th Gen CPUs and newer](https://williamlam.com/2023/01/video-of-esxi-install-workaround-for-fatal-cpu-mismatch-on-feature-for-intel-12th-gen-cpus-and-newer.html)
> * [ESXi PSOD due to GP Exception 13 in world with Intel 13th Generation CPU](https://williamlam.com/2023/04/esxi-psod-due-to-gp-exception-13-in-world-with-intel-13th-generation-cpu.html)
