<template>
  <div class="emfe-panel-c">
    <div class="emfe-panel-c-logobox">
      <emfe-upload className="emfe-panel-c" :action="uploadAction" @success="uploadSuccess" :url="headImg"></emfe-upload>
    </div>
    <div class="emfe-panel-c-infobox">
      <div class="emfe-panel-c-infobox-about">
        <span class="emfe-panel-c-infobox-about-texts">{{greeting}}，{{showNickName}}</span>
        <span class="emfe-panel-c-infobox-about-father">
          <div class="emfe-panel-c-infobox-member" v-if="openMember===1 || openVip===1">
          <span class="emfe-panel-c-infobox-about-text">
          <img class="emfe-panel-c-infobox-about-novip" :src="memberlogoNoVip" v-if="isVip===2&&openVip===1" @click="renews">
          <img class="emfe-panel-c-infobox-about-img" v-if='!(openMember===2 &&openVip===1&&isVip===2)' :src="memberlogo" @click="freeLevels">{{levelName}}</span>
          <a class="emfe-panel-c-infobox-youhui" v-if="isVip===2&&openVip===1&&timeJudge===''">开通享优惠<i class="emfe-panel-c-infobox-youhui-i"></i></a>
        </div>
        <template v-if="openMember===1 || openVip===1">
          <span :class="{'emfe-panel-c-infobox-about-overdue': openMember===1&&openVip===1&&timeJudge===1}">
            <span class="emfe-panel-c-infobox-about-text emfe-panel-c-infobox-about-guoqi" :class="{'emfe-panel-c-infobox-about-back': openMember===1&&openVip===1&&timeJudge===1}" v-if="isVip===2&&openVip===1&&timeJudge===1">{{memberDeadlines}} 已过期</span>
          <emfe-link class="emfe-panel-c-infobox-about-link" :routers="{}" v-if="openVip===1&&isVip===1 || timeJudge===1" @click="renews">续费</emfe-link>
          <img class="emfe-panel-c-infobox-about-arrow" v-if="openMember===1&&timeJudge===1" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QOLaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MjVCQjJDMTk0NjIwNjgxMTgyMkFGMjVFRjU0OUZENEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDQxRjFGQjhCMDlFMTFFNzgzMUI4QjAwNTQxMUY4NzAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDQxRjFGQjdCMDlFMTFFNzgzMUI4QjAwNTQxMUY4NzAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxODQ0ODQyNy05NWE0LTRmNTgtYTBjMS1hZmMwN2Q4NWI1MjciIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2MTlmMTg1My1jZjg2LTExN2EtOTlmYS1lN2FkMzZkNTFjNzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgIDAwMDAwMDAwMDAQEBAQEBAQIBAQICAgECAgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/wAARCAAGAAkDAREAAhEBAxEB/8QAaQABAQAAAAAAAAAAAAAAAAAAAQoBAQEAAAAAAAAAAAAAAAAAAAEIEAABBAECBwAAAAAAAAAAAAAFAQMEBgcAAhEhEhSlZigRAAEDAwIHAAAAAAAAAAAAAAMBAgQAEQUxBkIToxRlByj/2gAMAwEAAhEDEQA/ALAsWizk/CtMn2OyuAMbD6zCVmvYihWEkcOw06kfdInwQpbFGguvLuXswMSNvZ2pznPNcdT/ALIg5OV63x0rMTVi7NFCZYGKZIIY7OJSHALuGsVbryoIhqxNZJGXqlN+z8VE9n5OJhYKS97GnPvIy744gAfwoOOcvbOeiWTnTyka9dIoiWp+NPTPO6fnXx3Xo+mPJ9Cv/9k=" alt="">
          </span>
          <span class="emfe-panel-c-infobox-about-text" v-if="(openVip===1&&isVip===2&&openMember===1) || openMember===1&&isVip===2">成长值<em class="emfe-panel-c-infobox-about-text-em">{{ growth }}</em></span>
          <span class="emfe-panel-c-infobox-about-text" v-if="openVip===1&&isVip===1 || openMember===1">积分<em class="emfe-panel-c-infobox-about-text-em">{{ integral }}</em></span>
        </template>
        </span>
      </div>
      <div class="emfe-panel-c-infobox-info">
        <span class="emfe-panel-c-infobox-info-text">账号：+（{{code}}）{{showPhone}}</span>
        <!-- <emfe-link className="emfe-panel-c" :routers="telRouters">
          <emfe-icon type="shouji1" className="emfe-panel-c"></emfe-icon>
        </emfe-link>
        <emfe-link className="emfe-panel-c" :routers="infoRouters">
          <emfe-icon type="chengwei1" className="emfe-panel-c"></emfe-icon>
        </emfe-link>
        <emfe-link className="emfe-panel-c" :routers="walletRouters">
          <emfe-icon type="zhongzhimima" className="emfe-panel-c"></emfe-icon>
        </emfe-link> -->
      </div>
    </div>
    <div class="emfe-panel-c-orderbox">
      <div class="emfe-panel-c-orderbox-item" @click="pendingPays">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNUJCMkMxOTQ2MjA2ODExODIyQUYyNUVGNTQ5RkQ0QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNEYzRTRGQTk0NDAxMUU3OTYyOUU1MTk1MjREMTRFMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNEYzRTRGOTk0NDAxMUU3OTYyOUU1MTk1MjREMTRFMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFDOEUzMDkxMkI1MzMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4ZmE0ZjBiNi1iMzAxLTExN2EtOWEzYy04MjZkNDUyNjY3YjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5h5Ka5AAAE9ElEQVR42sSZa0wcVRTHzxlYRCiKPKrIAk1bRCmuaS0+Il9ahIbYEGK12KiJqZraFImaJmpim8b6QeOrsSWxpuGL2Jb6SEOrWET50qRNt7WpCBUfNcAKVWAh8ihlZa7/c2exFpaluzvAIWeH2Z2d89szd+495z+sBnsoVDOrygxs8uGr4Cvht8HT4fH+Q4bhf8B/hp+GN8HdxpbD5pSTLUgJGotDAQSYE5st8McpKTODM+4iujmH+CanFcgRax3oGyUa6iU1AMaLP5HqPEfk7ejEJ5/AqwDqsRUQYMnYvA6AZzi3OIbvKCRKzgot7X3tpM5/S6q1YQw/YB/e2Q7QvogBAbee2KjiO0tSOL+cKPYGishGB0m5D5JqrkeKzQrj5eO1YQECLBqb3ZR463NG0YtEC7PJVvvrVzK/eY9ooOtD7D0P0H+uGRBwcdjUctaKtVy8lSgmjmbFxkZINbxDqv37o9grB+TIjID+zH3O2QWl/CAyZ0TRrJo5TqrxfVK/HK/D3rrJmTQCfGUPL8ov5cIXZh9OE0SRxJKYEnvKx5OyV043pm1iGXNR0TRnhlg6JmKbbxVsCAiopxI29hhrZnHMBTPE1LHBAMjUQBl8g/NKUih1Cc2bITamsyT8t/MqQGQvE5Pw03xPOc236bnWEbsRWcyU/YmBtplzixzTTsKeH8g8uZ84Psk2EDXUQ8ajb0/9AAxYrRzqXN1m7L3K428+IFlsNzZ84MT6GvhkPx7TyeaM5ZGDdTUTpywhdaKauHRH4IO8HWQeqJT1OsuqSpIyp4Wz21TL16T6O4MfJCzCBDa5xKt1VRLMxn04szXzhzrHUfR14Y1FMClvxyoBvFtKpqC/+uwXxE58ob89tGx1nyfjoR3hpVozHVkpgDmc5Az+a1IXE5ftnPmkl4eQbaxUcYnW/qdbw7+bwYSLliOAaWTD3akunCQ68TFWhRii3EJi19rIThgvJSilyU2SQI7rIx/9LQ3E9z5JXPAsEQrTiM1iSvDPgxz5CZcVY+q4kkG7TAAHyTeSTFGRVcq8+D60TXlXj8FIzHdJXgcFsJuGvcnBSnnVc4Ho8LaQKxzV7wn/2gz3yWu3RGxTXk8eJy+aPjvLH9bzIKe7Qsuqqyz8m65fulZqE8Az9GfbOsouCFKvOay6woYyjOWPWc/7Qe1im7yelru4Sfetc1Wt3P8UyqqlM2fQo5maJIOnsDh74NOux5yYpqsZ6jxr35p8eXj68YliAX20FAvuaJEjUA/WqNbGV7hgY+AvOF1kPOKyN5PB4FsbZVODBsqcqKirdMc/+ve8F6zCoFnA9F9FrbUS3+g+5a6ddz7lPiTaTjWy55nck2xXzfV91PPb/NEhtmr+SibA16Y0TVrIUWaF2fBu6HWfTSqDjq3MSmSvL2BfDMiDNNC1VzXu0h3/nJlWF3aJTvMR4PbPpCxUqt9P1c0Z5IT0gZgiIoUiHn3GWStK5kg8+hJ7669JPPofpMMvv20yil4iWrjUXrgr8ttev/zmC1fAfAzNz25RHSwBM8EGAbMWrWx9Ly6v3BAHwhIwJ0GmaDkCHT8vW2NJwKG2qVi+tATcckwk4Gq8sw03Ze9siOgV8CcAmK7b1Vtux1qdbonhMf7WYexSIBFd6qcakdhsF9EDgE48hlit21brMYTAL/AfMiSCCVmPIc7Av6MwH0P8K8AAFtb5/Oq5D4MAAAAASUVORK5CYII=" class="emfe-panel-c-orderbox-img">
        <p class="emfe-panel-c-orderbox-text">待支付（{{pendingPaymentNum}}）</p>
      </div>
      <div class="emfe-panel-c-orderbox-item" @click="pendingAudits">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNUJCMkMxOTQ2MjA2ODExODIyQUYyNUVGNTQ5RkQ0QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFOTM5QjZFQjk0NDAxMUU3OTYyOUU1MTk1MjREMTRFMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFOTM5QjZFQTk0NDAxMUU3OTYyOUU1MTk1MjREMTRFMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFDOEUzMDkxMkI1MzMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4ZmE0ZjBiNi1iMzAxLTExN2EtOWEzYy04MjZkNDUyNjY3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" class="emfe-panel-c-orderbox-img">
        <p class="emfe-panel-c-orderbox-text">待审核（{{pendingAuditNum}}）</p>
      </div>
      <div class="emfe-panel-c-orderbox-item" @click="pendingShipments">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNUJCMkMxOTQ2MjA2ODExODIyQUYyNUVGNTQ5RkQ0QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNEYzRTRGRTk0NDAxMUU3OTYyOUU1MTk1MjREMTRFMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNEYzRTRGRDk0NDAxMUU3OTYyOUU1MTk1MjREMTRFMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFDOEUzMDkxMkI1MzMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4ZmE0ZjBiNi1iMzAxLTExN2EtOWEzYy04MjZkNDUyNjY3YjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4L1EyWAAAFRklEQVR42syZf0yVVRjHv+fARRQJA1KQC7gp8SMbpbB+0R+iWLTG2ChwRa1amiWyslrrD/sj2lorjc1YSc5NRwlWW1nmIos/ov4AdWiFYrgEbkAJSCKoXH1Pz/O+9zqCe9/73nu5yNmee/be+95zPvd5z3nO83yvUCPn4G/Taooldblkq8hyyG4lSyKLct0ySvYX2WmyI2RNZK1y05falMHmx5vOJfwBJDA7dZvIHkdsSrJIzgYWpUPcbDcmskUaNzovAxcHoIaJsf8UVM9xYKi7hz75hKyGQB3TCkhgcdS9SQDPiqy1ESJzNRCX6p/bB7ugTv4A1d44Tj9gF73zBoEOBg1IcKUQskbcXhgvcsuAyJsQVLs8AtVaD/XrIXKxViFfa24ICJDAwqnbgQWLN8qCl4CFaZjW9k8ntO+3A8O9H9HVZgK9ahmQ4OZR1yBSVzws1r4CRMxDSNr4GFTje1Bdx76hqzKCHPMJ6PLcFyItr0isIc/JMIS0adegDr8P9UfzAboqmexJ6eErH4gluUVi9Yuhh9MJwsBz8Zw8t6kHyXtliEmsl6XbQvdYTR63tv9l4N++x8iL+6YA6qFEyFPy0XfjcctS3JB27gy0z14dot2dQZA6WPiEj98SywtN4VRPG9S3bwNXrwQGED4H4qHXIZLv8Pw5zU3hLFadOFhFVxuve5C8l0JBuFM+WWszi3PaV1shFmVCLM0LiE+daYbqPwlZXGUSJy9A27vBScF8GXmx271JnhdZBaZwvEbQ206L+S5jfQZg+nf72o2xvDVioNPKxkz6HnId/OUEaP7ru44Zx9vcmMDXGH+XxlBdR82Pt6w13JVr7+RJIyuJTbGTmQ9+tgXCnh30PhB2Wn9nW81vYhZmIjbeJPl6VuJr/XS3QWQWQDnagiQUxli+biMmNdS9igFXcsrk+5C/QLuYHrNDBgeoNH0sn01n+jqHAdNFrN1a0C//EJgzPzjAKxehVT/o29HEpIiN3ZGIqFjMuhbFKSgSGTAatrmzD9BginYtKBH6CfkY27seuOb07/AhG4FzLA5h1jJldYJSt86fva+de58CEiZtuvMOaPWUsXBGHmazRua8xK8jDNiH0aE4q6m8SMyEEtJrCEFMAuV31RSQl0DcWWzA7dusw4m7y/VNYqmNDvJrHwN2qCHHckEDWmp8oPvIduiootRpiz4Je1xkFxlw/kSj81y1ooMBj+LvjhKkWUsA1C97oH76eBKRhNxAKdyCJON6cRZk6XYdkr0o7nva/zXb38GvRxiwietWq9tE3PMExMqSKYBTElyGrKT1KsMDi+eO49w18WJqoaLaQWaRUBrBeqJ5y74DhNNZBrscuhrhkiPqVPvhWRMCXSx1lA9q7p9YQxX/FpHzSITpbh4bDn52X2Pwmc/qAzFdT/lZK6G8cJdqbXhB3L/e85PNyIdWu25aPMRjefVe637WdnaT9xyeiqYOKpribnDRRLFJSyfAwf/VxbqQo7QKrXGbeUoeyrKT51ZapRtuSuFOkPUY7t2pnwRU8c9Y09WFatZpagnuU1/KQqX6s+XAjEG6pQ+ak0Ukf8Sjz0XqisIZEo8O0lWpJfFoAqTNJb89JwvoXF24LFTy206X/OYMVMBcBxm2g1UHQ8CMngYBswHqt0MD9HgrJ+owAQG6IFmnrYIt8hlx2wOGBOyrTPVwfOkS8O/fsQS8m97ZSptyIBQiegUX1QSYpJerCRkQnMXwRBGu0mH8kicRnfOnOpbYpl1E9wDq/hsiXy9bjb8hGN5d8nFWyhCn9XQO+BEB/g3xnwADAPimNwO3yoAgAAAAAElFTkSuQmCC" class="emfe-panel-c-orderbox-img">
        <p class="emfe-panel-c-orderbox-text">待发货（{{pendingShipmentNum}}）</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmfePanelC',
  data() {
    return {
      logo: '',
      isguoqi: '',
    };
  },
  props: {
    headImg: {
      type: String,
      required: true,
    },
    memberlogo: {
      type: String,
      required: true,
    },
    memberlogoNoVip: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    levelName: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    isMember: {
      type: Number,
      required: true,
    },
    openMember: {
      type: Number,
      requireed: true,
    },
    isVip: {
      type: Number,
      required: true,
    },
    openVip: {
      type: Number,
      required: true,
    },
    memberDeadline: {
      type: String,
      required: true,
    },
    growth: {
      type: Number,
      required: true,
    },
    integral: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    pendingPaymentNum: {
      type: Number,
      required: true,
    },
    pendingAuditNum: {
      type: Number,
      required: true,
    },
    pendingShipmentNum: {
      type: Number,
      required: true,
    },
    telRouters: {
      type: Object,
      required: true,
    },
    infoRouters: {
      type: Object,
      required: true,
    },
    walletRouters: {
      type: Object,
      required: true,
    },
    uploadAction: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggle(status) {
      this.$emit('switch-toogle', status);
    },
    iconClick(index) {
      this.$emit('icon-click', index);
    },
    uploadSuccess(res) {
      this.$emit('uploadSuccess', res);
    },
    pendingPays() {
      this.$emit('pendingPay');
    },
    pendingAudits() {
      this.$emit('pendingAudit');
    },
    pendingShipments() {
      this.$emit('pendingShipment');
    },
    renews() {
      this.$emit('renew');
    },
    freeLevels() {
      this.$emit('freeLevel');
    },
  },
  computed: {
    classList() {
      return [
        {
          [`${this.className}-panel-c`]: !!this.className,
        },
      ];
    },
    boxName() {
      return [
        {
          [`${this.className}-panel-c-box`]: !!this.className,
        },
      ];
    },
    leftName() {
      return [
        {
          [`${this.className}-panel-c-box-left`]: !!this.className,
        },
      ];
    },
    rightName() {
      return [
        {
          [`${this.className}-panel-c-box-right`]: !!this.className,
        },
      ];
    },
    showPhone() {
      return this.phone.toString().replace(/^(\d{3})\d{4}(\d+)/, '$1****$2');
    },
    memberDeadlines() {
      return this.memberDeadline.slice(0, 10);
    },
    timeJudge() {
      const myDate = new Date();
      const endTime =
          `${myDate.getFullYear()}-${(myDate.getMonth() + 1)}-${myDate.getDate()} ${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;
      if (this.memberDeadline === '') {
        return '';
      } else if (this.memberDeadline !== '' && new Date(endTime).getTime() > new Date(this.memberDeadline).getTime()) {
        return 1;
      }
      return 2;
    },
    showNickName() {
      if (this.nickName.length > 5) {
        return `${this.nickName.substring(5, 0)}...`;
      }
      return this.nickName;
    },
    greeting() {
      const myDate = new Date();
      const myhours = myDate.getHours();
      if (myhours >= 0 && myhours < 12) {
        return '早上好';
      } else if (myhours >= 12 && myhours < 13) {
        return '中午好';
      } else if (myhours >= 13 && myhours < 18) {
        return '下午好';
      }
      return '晚上好';
    },
  },
};
</script>
