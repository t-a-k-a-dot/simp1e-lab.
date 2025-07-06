---
title: 'Windows クライアントで NIC の DNS サーバー設定を変更せずに特定ドメインの名前解決のみ利用する DNS サーバーを指定'
description: '自宅ラボ環境の名前解決のために Windows のDNSサーバ設定を変更するのが嫌になり、特定ドメインの名前解決だけ別の DNS サーバを利用する設定を行った時のメモ。'
pubDate: 2025-07-06
tags: ['Windows']
---
## はじめに
自宅ラボ環境に Active Directory ドメインを構築しており、自宅ラボへのアクセスは Windows クライアントから行っている。  
Windows クライアントは自宅ラボ以外の用途にも利用していることからインターネットの名前解決と自宅ラボ環境ドメインの双方の名前解決を行いたいと考えた。  

自宅ラボ環境のドメインの名前解決に都度、 Windows クライアントの DNS サーバー設定は変更したくなく、 hosts も利用したくない。  
また、自宅ラボ環境の DNS サーバーに DNS フォワーダを設定し、 Windows クライアントの DNS サーバーとして利用することで実現もできるが、インターネットの名前解決が遅くなるため、その手段も取りたくない。  

そんな中で Windows クライアントの設定でやりたいことを実現したため、備忘のため記事に残す。

## この記事を読んで欲しい人
* プロバイダ・ルーター等の DNS でインターネット向けの名前解決を行いつつ、自宅ラボ・検証環境向けの名前解決も行いたい人
* 自宅ラボ・検証環境向けの名前解決のために Windows クライアントの DNS サーバーの設定を変更したくない人

## 前提
今回、 .lab.local ドメインの名前解決のみ 192.168.1.200 の DNS サーバーを利用する設定を行う。  
この手順で事前に準備すべき各パラメータを以下に記載する。  

| パラメータ | 手順上の設定値 | 備考 |
| --- | --- | --- |
| 特定ドメイン | .lab.local | 手順上は < domain > で記載 |
| 特定ドメインの名前解決をする DNS サーバーアドレス | 192.168.1.200 | 手順上は < nameserver_address > で記載 |

## 設定追加
1. キーボードの [Windows] + [X] でシステムメニューを開き、 [A] キー を押下し、ターミナルを管理者として起動する  
    <br>

1. ターミナルがコマンド プロンプトで起動している場合、以下のコマンドで PowerShell を起動する  
    ```powershell
    powershell
    ```
    <br>

1. PowerShell にて以下のコマンドを実行し、特定ドメインの名前解決のみ利用する DNS サーバーを指定する  
    ```powershell
    Add-DnsClientNrptRule -Namespace "< domain >" -NameServers "< nameserver_address >"
    ```

    > [!CAUTION]
    > < domain > は `.lab.local` 、 < nameserver_address > は `192.168.1.200` を以下の実行例の通り指定
    
    ```powershell
    Add-DnsClientNrptRule -Namespace ".lab.local" -NameServers "192.168.1.200"
    ```
    > [!NOTE]
    > 実動作は Ping コマンドで動作確認が可能  

    <br>

## 設定削除
1. PowerShell にて以下のコマンドを実行し、現在の設定を確認する  
    ```powershell
    Get-DnsClientNrptRule
    ```
    ___
    Name                             : {1C135080-49E5-432B-912E-567095F6FD67}  
    Version                          : 2  
    Namespace                        : {.lab.local}  
    IPsecCARestriction               :  
    DirectAccessDnsServers           :  
    DirectAccessEnabled              : False  
    DirectAccessProxyType            :  
    DirectAccessProxyName            :  
    DirectAccessQueryIPsecEncryption :  
    DirectAccessQueryIPsecRequired   :  
    NameServers                      : 192.168.1.200  
    DnsSecEnabled                    : False  
    DnsSecQueryIPsecEncryption       :  
    DnsSecQueryIPsecRequired         :  
    DnsSecValidationRequired         :  
    NameEncoding                     : Disable  
    DisplayName                      :  
    Comment                          :  
    ___
    <br>
  
1. PowerShell にて以下のコマンドを実行し、設定を削除する  
    ```powershell
    Remove-DnsClientNrptRule -Name "< Name >" -PassThru
    ```
    
    > [!CAUTION]
    > < Name > は今回の場合、以下の実行例の通り `{1C135080-49E5-432B-912E-567095F6FD67}` を指定

    ```powershell
    Remove-DnsClientNrptRule -Name "{1C135080-49E5-432B-912E-567095F6FD67}" -PassThru
    ```
    <br>


1. 以下の確認メッセージが表示されるため、 `Y` を入力し、 [ENTER] を押下  
    ___
    確認  
    名前空間 .lab.local の NRPT ルールを削除します。各値は次のとおりです  
    DAEnable: 無効  
    DnsSecValidationRequired: 無効  
    NameEncoding: Disable  
    NameServers: 192.168.1.200  
    続行しますか?  
    [Y] はい(Y)  [N] いいえ(N)  [S] 中断(S)  [?] ヘルプ (既定値は "Y"):  
    ___
    <br>

1. PowerShell にて以下のコマンドを実行し、設定が削除されていることを確認する  
    ```powershell
    Get-DnsClientNrptRule
    ```
    <br>

## 環境
* Windows 11 Home 24H2 ( Build\:26100.2605 )
* PowerShell 5.1.26100.2161  
